/* INTRINSE — font loader
   Typefaces (Jost, Montserrat) are self-hosted under /fonts/ — same-origin
   static files, no third-party request, no data sent anywhere. No cookies,
   no analytics, no tracking anywhere on this site, so nothing here requires
   prior consent. */
(function () {
  var FONT_CSS_URL = '/fonts/fonts.css';

  if (document.getElementById('gfonts-stylesheet')) return;
  var sheet = document.createElement('link');
  sheet.id = 'gfonts-stylesheet';
  sheet.rel = 'stylesheet';
  sheet.href = FONT_CSS_URL;
  document.head.appendChild(sheet);
})();
