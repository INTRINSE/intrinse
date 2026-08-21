/* INTRINSE — font loader + cookie consent (Google Analytics)
   Typefaces (Jost, Montserrat) are self-hosted under /fonts/ — same-origin
   static files, no third-party request, no data sent anywhere — they load
   unconditionally, independent of the consent choice below.
   Google Analytics (GA4) is the only thing gated here: it only loads after
   the visitor clicks "Akzeptieren". Choosing "Ablehnen" (or not deciding)
   means no GA4 request is ever made. The decision is stored in localStorage;
   the banner only ever runs once per decision. */
(function () {
  var KEY = 'intrinse-consent';
  var FONT_CSS_URL = '/fonts/fonts.css';
  var GA_ID = 'G-1TPG3DJVZ9';

  function loadFonts() {
    if (document.getElementById('gfonts-stylesheet')) return;
    var sheet = document.createElement('link');
    sheet.id = 'gfonts-stylesheet';
    sheet.rel = 'stylesheet';
    sheet.href = FONT_CSS_URL;
    document.head.appendChild(sheet);
  }

  loadFonts();

  function loadAnalytics() {
    window['ga-disable-' + GA_ID] = false;
    if (document.getElementById('ga4-script')) return;
    var s = document.createElement('script');
    s.id = 'ga4-script';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function disableAnalytics() {
    // Google's documented opt-out flag: stops the library from sending hits
    // even if gtag.js was already loaded from an earlier "accepted" choice.
    window['ga-disable-' + GA_ID] = true;
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
    hideBanner();
    if (value === 'accepted') {
      loadAnalytics();
    } else {
      disableAnalytics();
    }
  }

  /* Runs after DOM parsing (script has [defer]), so #consent-banner exists. */
  var choice = localStorage.getItem(KEY);
  if (choice === 'accepted') {
    loadAnalytics();
  } else if (choice === 'declined') {
    disableAnalytics();
  } else {
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
