/* INTRINSE — minimal cookie consent
   Typefaces (Jost, Nunito Sans) are self-hosted under /fonts/ — same-origin
   static files, no third-party request, no data sent anywhere. They load
   unconditionally, independent of the consent choice below.
   The banner itself is kept for transparency/control even though nothing
   left on this site actually requires prior consent: no analytics, no
   marketing scripts, no third-party font CDN. The Shopify Buy Button
   script sets no cookies on load (verified) — only the Shopify-hosted
   checkout a visitor explicitly navigates to might, which is covered
   separately in datenschutz.html.
   Decision is stored in localStorage; the banner only ever runs once. */
(function () {
  var KEY = 'intrinse-consent';
  var FONT_CSS_URL = '/fonts/fonts.css';

  function loadFonts() {
    if (document.getElementById('gfonts-stylesheet')) return;
    var sheet = document.createElement('link');
    sheet.id = 'gfonts-stylesheet';
    sheet.rel = 'stylesheet';
    sheet.href = FONT_CSS_URL;
    document.head.appendChild(sheet);
  }

  loadFonts();

  function showBanner() {
    var banner = document.getElementById('consent-banner');
    if (!banner) return;
    banner.hidden = false;
    requestAnimationFrame(function () {
      banner.classList.add('vis');
    });
  }

  function hideBanner() {
    var banner = document.getElementById('consent-banner');
    if (!banner) return;
    banner.classList.remove('vis');
    setTimeout(function () {
      banner.hidden = true;
    }, 400);
  }

  function setChoice(value) {
    localStorage.setItem(KEY, value);
    hideBanner();
  }

  /* Runs after DOM parsing (script has [defer]), so #consent-banner exists. */
  var choice = localStorage.getItem(KEY);
  if (choice !== 'accepted' && choice !== 'declined') {
    showBanner();
  }

  var acceptBtn = document.getElementById('consent-accept');
  var declineBtn = document.getElementById('consent-decline');
  if (acceptBtn) acceptBtn.addEventListener('click', function () { setChoice('accepted'); });
  if (declineBtn) declineBtn.addEventListener('click', function () { setChoice('declined'); });

  var manageLink = document.getElementById('consent-manage');
  if (manageLink) {
    manageLink.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem(KEY);
      showBanner();
    });
  }
})();
