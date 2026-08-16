const { XMLParser, XMLBuilder } = require('fast-xml-parser');
const crypto = require('crypto');

// IT-Recht Kanzlei "type" -> static HTML file in this repo.
const PAGE_MAP = {
  impressum: 'impressum.html',
  agb: 'agb.html',
  datenschutz: 'datenschutz.html',
  widerruf: 'widerruf.html',
};

// Per LTI spec: no PDF version exists for "impressum".
const PDF_REQUIRED_TYPES = new Set(['agb', 'datenschutz', 'widerruf']);

const API_VERSION = '1.0';
const MODULE_VERSION = '1.0.0';

const xmlParser = new XMLParser({ ignoreAttributes: true, trimValues: false, parseTagValue: false });
const xmlBuilder = new XMLBuilder({ format: true, suppressEmptyNode: false });

function sendXml(res, httpStatus, responseBody) {
  const xml =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
    xmlBuilder.build({ response: responseBody });
  res.status(httpStatus);
  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.send(xml);
}

function sendError(res, code, message, httpStatus = 200) {
  sendXml(res, httpStatus, { status: 'error', error: code, error_message: message });
}

async function readRawBody(req) {
  if (typeof req.body === 'string') return req.body;
  if (Buffer.isBuffer(req.body)) return req.body.toString('utf8');
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length) {
    // Defensive fallback if a platform layer ever JSON-parses this.
    return String(req.body);
  }
  return await new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

// Constant-time token compare, independent of input length.
function tokensMatch(provided, expected) {
  if (!provided || !expected) return false;
  const a = crypto.createHash('sha256').update(String(provided)).digest();
  const b = crypto.createHash('sha256').update(String(expected)).digest();
  return crypto.timingSafeEqual(a, b);
}

// Defense in depth: legal text has no legitimate need for scripts/styles/handlers.
function sanitizeLegalHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object[\s\S]*?<\/object>/gi, '')
    .replace(/<embed[^>]*>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/<img[^>]*\bid=["']itkanzlei_img_copyright["'][^>]*>/gi, '')
    .replace(/<img[^>]*\bsrc=["']https?:\/\/(?:www\.)?it-recht-kanzlei\.de\/logo\/[^"']*["'][^>]*>/gi, '')
    .replace(/<a[^>]*\bhref=["']https?:\/\/(?:www\.)?it-recht-kanzlei\.de\/?["'][^>]*>\s*<\/a>/gi, '');
}

// Escape any "%" not followed by two valid hex digits, so a stray literal
// "%" (e.g. inside "19%") doesn't make decodeURIComponent throw for the
// entire field. Valid %XX (and multi-byte %XX%XX UTF-8) sequences are left
// untouched so real percent-encoding still decodes correctly.
function sanitizePercentEncoding(str) {
  return str.replace(/%(?![0-9A-Fa-f]{2})/g, '%25');
}

// PHP's urlencode() — the most common server-side encoder for this kind of
// payload — encodes spaces as "+" rather than "%20". decodeURIComponent
// leaves "+" untouched, so it must be converted before decoding.
function lenientDecodeURIComponent(str) {
  const withSpaces = str.replace(/\+/g, ' ');
  const sanitized = sanitizePercentEncoding(withSpaces);
  return decodeURIComponent(sanitized);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function githubRequest(path, options = {}) {
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(`https://api.github.com/repos/${repo}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'intrinse-legal-texts-sync',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`GitHub API ${options.method || 'GET'} ${path} failed: ${res.status} ${body}`);
  }
  return res.status === 204 ? null : res.json();
}

async function commitFile(filePath, newContentBuffer, commitMessage) {
  const branch = process.env.GITHUB_BRANCH || 'main';
  let sha;
  try {
    const current = await githubRequest(
      `/contents/${encodeURIComponent(filePath)}?ref=${encodeURIComponent(branch)}`
    );
    sha = current.sha;
  } catch (e) {
    sha = undefined; // File does not exist yet -> create it.
  }
  await githubRequest(`/contents/${encodeURIComponent(filePath)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: commitMessage,
      content: newContentBuffer.toString('base64'),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
}

function applyLegalTextToPage(currentHtml, { title, bodyHtml }) {
  let html = currentHtml;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)} — INTRINSE</title>`);
  html = html.replace(
    /<h1 id="legal-title">[\s\S]*?<\/h1>/,
    `<h1 id="legal-title">${escapeHtml(title)}</h1>`
  );
  html = html.replace(
    /<!-- LEGAL-BODY:START -->[\s\S]*?<!-- LEGAL-BODY:END -->/,
    `<!-- LEGAL-BODY:START -->\n${bodyHtml}\n  <!-- LEGAL-BODY:END -->`
  );
  return html;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendError(res, 99, 'Only POST is supported.', 405);
  }

  let api;
  try {
    const raw = await readRawBody(req);
    const parsed = xmlParser.parse(raw);
    api = parsed.api;
    if (!api) throw new Error('Missing <api> root element.');
  } catch (e) {
    return sendError(res, 12, 'XML could not be parsed.');
  }

  const apiVersion = api.api_version != null ? String(api.api_version) : '';
  if (apiVersion !== API_VERSION) {
    return sendError(res, 1, `Unsupported api_version "${apiVersion}".`);
  }

  const action = (api.action != null ? String(api.action) : '').trim().toLowerCase();
  if (!action) {
    return sendError(res, 10, 'Missing or empty action.');
  }

  const expectedToken = process.env.IT_RECHT_KANZLEI_TOKEN;
  const providedToken = api.user_auth_token != null ? String(api.user_auth_token) : '';
  if (!tokensMatch(providedToken, expectedToken)) {
    return sendError(res, 3, 'Invalid or missing user_auth_token.');
  }

  if (action === 'version' || action === 'getversion') {
    return sendXml(res, 200, {
      status: 'success',
      meta_shopversion: API_VERSION,
      meta_modulversion: MODULE_VERSION,
    });
  }

  if (action === 'getaccountlist') {
    return sendXml(res, 200, {
      status: 'success',
      account: { accountid: 0, accountname: '' },
    });
  }

  if (action !== 'push') {
    return sendError(res, 10, `Unknown action "${action}".`);
  }

  const type = api.rechtstext_type != null ? String(api.rechtstext_type).trim().toLowerCase() : '';
  const targetFile = PAGE_MAP[type];
  if (!targetFile) {
    return sendError(res, 4, `Unknown or missing rechtstext_type "${type}".`);
  }

  const title = api.rechtstext_title != null ? String(api.rechtstext_title).trim() : '';
  if (!title) return sendError(res, 18, 'rechtstext_title is empty.');

  const language = api.rechtstext_language != null ? String(api.rechtstext_language).trim() : '';
  if (!language) return sendError(res, 9, 'rechtstext_language is empty.');

  const country = api.rechtstext_country != null ? String(api.rechtstext_country).trim() : '';
  if (!country) return sendError(res, 17, 'rechtstext_country is empty.');

  const plainText = api.rechtstext_text != null ? String(api.rechtstext_text) : '';
  if (!plainText.trim()) return sendError(res, 5, 'rechtstext_text is empty.');

  const encodedHtml = api.rechtstext_html != null ? String(api.rechtstext_html) : '';
  if (!encodedHtml.trim()) return sendError(res, 6, 'rechtstext_html is empty.');

  let decodedHtml;
  try {
    decodedHtml = lenientDecodeURIComponent(encodedHtml);
  } catch (e) {
    console.error('rechtstext_html decode failed:', e.message, 'raw excerpt:', encodedHtml.slice(0, 200));
    return sendError(res, 6, `rechtstext_html could not be URL-decoded (${e.message}). Excerpt: ${encodedHtml.slice(0, 80)}`);
  }
  const safeHtml = sanitizeLegalHtml(decodedHtml);

  let pdfBuffer = null;
  if (PDF_REQUIRED_TYPES.has(type)) {
    const pdfBase64 = api.rechtstext_pdf != null ? String(api.rechtstext_pdf) : '';
    const pdfUrl = api.rechtstext_pdf_url != null ? String(api.rechtstext_pdf_url) : '';
    if (!pdfBase64.trim() && !pdfUrl.trim()) {
      return sendError(res, 7, 'Neither rechtstext_pdf nor rechtstext_pdf_url provided.');
    }
    if (pdfBase64.trim()) {
      try {
        pdfBuffer = Buffer.from(pdfBase64, 'base64');
      } catch (e) {
        return sendError(res, 7, 'rechtstext_pdf could not be decoded from base64.');
      }
      const expectedMd5 = api.rechtstext_pdf_md5hash != null ? String(api.rechtstext_pdf_md5hash).trim().toLowerCase() : '';
      if (expectedMd5) {
        const actualMd5 = crypto.createHash('md5').update(pdfBuffer).digest('hex');
        if (actualMd5 !== expectedMd5) {
          return sendError(res, 7, 'rechtstext_pdf_md5hash does not match the transmitted PDF.');
        }
      }
    }
  }

  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO) {
    return sendError(res, 99, 'Server is not configured for persisting legal texts.', 500);
  }

  try {
    const current = await githubRequest(
      `/contents/${encodeURIComponent(targetFile)}?ref=${encodeURIComponent(process.env.GITHUB_BRANCH || 'main')}`
    );
    const currentHtml = Buffer.from(current.content, 'base64').toString('utf8');
    const updatedHtml = applyLegalTextToPage(currentHtml, { title, bodyHtml: safeHtml });

    await commitFile(
      targetFile,
      Buffer.from(updatedHtml, 'utf8'),
      `Rechtstext-Update: ${type} (via IT-Recht Kanzlei Schnittstelle)`
    );

    if (pdfBuffer) {
      await commitFile(
        `legal/${type}.pdf`,
        pdfBuffer,
        `Rechtstext-PDF-Update: ${type} (via IT-Recht Kanzlei Schnittstelle)`
      );
    }
  } catch (e) {
    return sendError(res, 50, `Saving the legal text failed: ${e.message}`, 500);
  }

  return sendXml(res, 200, {
    status: 'success',
    meta_shopversion: API_VERSION,
    meta_modulversion: MODULE_VERSION,
    target_url: `https://www.intrinse.eu/${targetFile}`,
  });
};
