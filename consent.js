/* INTRINSE — minimal cookie consent
   Gates the custom typefaces (Jost, Nunito Sans). Self-hosted under /fonts/
   as of this version — no third-party request to Google is made at all,
   but loading is still deferred until consent to keep behavior/timing
   identical to before and to match the description in datenschutz.html.
   The Shopify Buy Button script is not gated here — it sets no cookies on
   load (verified), only the Shopify-hosted checkout a visitor explicitly
   navigates to might set cookies, which is covered separately in
   datenschutz.html. No analytics, no marketing scripts exist in this
   project, so no further categories are needed.
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
    if (value === 'accepted') loadFonts();
    hideBanner();
  }

  /* Runs after DOM parsing (script has [defer]), so #consent-banner exists. */
  var choice = localStorage.getItem(KEY);
  if (choice === 'accepted') {
    loadFonts();
  } else if (choice !== 'declined') {
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
