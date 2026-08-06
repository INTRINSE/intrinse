/* INTRINSE — minimal cookie consent
   Gates the only third-party resource that needs prior consent: Google Fonts.
   The Shopify Buy Button script is not gated here — it sets no cookies on
   load (verified), only the Shopify-hosted checkout a visitor explicitly
   navigates to might set cookies, which is covered separately in
   datenschutz.html. No analytics, no marketing scripts exist in this
   project, so no further categories are needed.
   Decision is stored in localStorage; the banner only ever runs once. */
(function () {
  var KEY = 'intrinse-consent';
  var FONT_CSS_URL = 'https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500&family=Montserrat:wght@600&display=swap';

  function loadFonts() {
    if (document.getElementById('gfonts-stylesheet')) return;
    var pre1 = document.createElement('link');
    pre1.rel = 'preconnect';
    pre1.href = 'https://fonts.googleapis.com';
    var pre2 = document.createElement('link');
    pre2.rel = 'preconnect';
    pre2.href = 'https://fonts.gstatic.com';
    pre2.crossOrigin = '';
    var sheet = document.createElement('link');
    sheet.id = 'gfonts-stylesheet';
    sheet.rel = 'stylesheet';
    sheet.href = FONT_CSS_URL;
    document.head.appendChild(pre1);
    document.head.appendChild(pre2);
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
