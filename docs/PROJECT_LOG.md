# INTRINSE Website — Project Log

Fortlaufende Dokumentation des Projektstands. Dient als Einstiegspunkt für zukünftige Sessions — was existiert, was wurde entschieden, was ist offen.

---

## 1. Projektübersicht

**Was das Projekt ist:** Eine vollständig statische Website (4 HTML-Dateien, kein Build-System, kein Framework, kein Shopify-Theme) für die Marke INTRINSE — ein Premium-Proteinpulver-Produkt (ENERGY) mit den geplanten Folgeprodukten FOCUS und BALANCE (aktuell "Coming Soon").

**Architektur:**
- `index.html` — Startseite: Hero, Philosophie, States-Überblick, ENERGY-Einstieg, Wissenswelt (Knowledge-Bibliothek, 5 Kapitel als Akkordeon), Choose-Your-State-Sektion, Footer.
- `energy.html` — Produktseite für ENERGY, inkl. Shopify-Buy-Button-Integration (clientseitiges SDK, **kein** Shopify-Theme).
- `impressum.html`, `datenschutz.html` — Rechtsseiten.
- `robots.txt`, `sitemap.xml` — im Projekt-Root (Sprint 6).
- `img/` — `hero.jpg`, `canister-alt.png` (aktiv genutzt), `canister-energy.png` (**unbenutztes Asset**, nie referenziert).
- Design-System: "Cool Gray"-Palette (`--stone:#d9dadb` etc.), Schriftart Jost (Google Fonts, 200–500 Gewicht), durchgängig zurückhaltende, museale Formsprache ("Museum statt Onlineshop").
- Checkout: Shopify Buy Button SDK (`buy-button-storefront/dist/buy-button.min.js`), reale Konfigurationswerte in `energy.html` (Domain `intrinse.eu`, Storefront-Token, Variant-ID) — Checkout selbst läuft auf Shopify-Infrastruktur, außerhalb dieser Codebasis.
- Domain: `https://intrinse.eu` — seit Sprint 4 offiziell als kanonische Produktions-Domain bestätigt (nicht mehr aus Indizien abgeleitet).

**Wichtig für zukünftige Arbeit:** Dieses Projekt ist bewusst *kein* Shopify-Theme. Native Shopify-Werkzeuge (Liquid, Theme-Templates, Shopify-eigene Consent-/Sitemap-/Robots-Mechanismen) greifen hier **nicht** — alles läuft über die vier statischen Dateien.

---

## 2. Chronologischer Verlauf (thematisch gruppiert)

### Phase 1 — Grundaufbau & Markensystem (früh im Projekt)
Initialer Aufbau der Seite, mehrfache Iteration der Farbpalette (Ausgangspunkt "warm", danach expliziter Wechsel zu "Cool Gray 9C" auf Nutzerwunsch), Neuaufbau der Homepage-Narrative (Hero → Philosophie → System → Energy → Wissenswelt), Redesign der "Choose Your State"-Sektion (von Panels zu einer ruhigeren, farblich atmosphärischen Lösung), Shopify-Checkout-Anbindung. Umfangreiche Iteration, u. a. sichtbar in Commits wie `2ff2f76`, `a6b8957`, `7f2d698`, `b6e58cb`, `2e7a02f`.

### Phase 2 — Feinschliff Homepage & Produktseite
Hero-Bild-Korrekturen (`42084b8` Rand entfernt), Philosophie-Text mehrfach überarbeitet (`33b32e5`, `920a120`), "ONE SYSTEM"-Sektion hinzugefügt und wieder verworfen (`2be8e12` → `4cf0cb7` Revert — bewusste Rücknahme einer Design-Idee), Typografie zwischen Homepage und Produktseite vereinheitlicht (`776c23d`), CTA-Button "CHOOSE ENERGY." mit echter Button-Optik versehen (`3deb9ef`), FOCUS/BALANCE als Warteliste mit Notify-Formular ergänzt (`016387f`, später Feintuning: `6e0a44a`, `e517033`, `2afe960`).

### Phase 3 — Wissenswelt / Knowledge-Bibliothek
Aufbau der Zutaten-Sektion zunächst auf `energy.html` (`b4d1231`), Abgleich mit dem offiziellen, signierten Produktdatenblatt von Terra Essence (`ac47e46` — korrekte Zutaten-Reihenfolge, "glutenarm"-Aussage entfernt, echte Standardisierungswerte ergänzt: 10 % Koffein, 98 % L-Theanin, 10 % Theobromin). Neues Kapitel **05 — Qualität** in der Wissenswelt ergänzt (`7786d38`), redaktionell gefüllt auf Basis der realen Zertifikate (GMP Food, HACCP, Bio-Zertifizierung — `fee761f`), später bewusst reduziert um Firmennamen/Registrierungsnummern (`6648e4e`, `fb19056`, `e33af93` — Prinzip: "zertifiziert"/"unabhängig auditiert" bleibt, konkrete Firmen-/Zertifikatsdetails raus). Kapitel **03 — Inhaltsstoffe** um die vollständige Zutatenliste erweitert (`606b581`) und danach auf eine ruhigere Erzählung reduziert (`24b1d98`). Die eigenständige Zutaten-Sektion auf `energy.html` wurde am Ende wieder **entfernt** (`623bc0e`), um Duplicate Content zu vermeiden — die Wissenswelt ist die alleinige Quelle für die Zutaten-Tiefe. Redaktionelle Einzelkorrekturen: Reisprotein-Evidenzabsatz ohne Molkenprotein-Vergleich (`6b33b40`), FOCUS-Formulierung auf Kreatin aktualisiert (`fb32242`), Kapitel "Zusammenhänge" überarbeitet (`8931545`).

### Phase 4 — Farbharmonisierung & UX-Politur
Header/Hero-Umgebung auf ein kohärentes Cool-Gray abgestimmt, Ursache empirisch per Pixel-Sampling der Hero-Fotografie verifiziert statt geraten (`cc65e34`). Scrollposition der Wissenswelt beim Schließen eines Kapitels korrekt wiederhergestellt (`f641565`). Diverse Detailkorrekturen an Impressum/Datenschutz: Platzhalter final ausgefüllt (`8315d0a`, `c9ef852`, `06bdab9`), Telefon-Platzhalter und Streitbeilegung-Absatz entfernt (`1de4dba`).

### Phase 5 — SEO-Sprints (1–6)
Systematischer Aufbau der technischen SEO-Grundlage, jeweils mit Vorab-Bestandsaufnahme, minimalinvasiver Umsetzung und Verifikation:
- **Sprint 1** (`986d00c`, `c3107e2`) — Semantische H1 auf Start- und Produktseite ergänzt, kaputte `#shop`→`#decision`-Anker behoben, Footer-Linktext "Knowledge"→"Wissenswelt" vereinheitlicht, leerer `mailto:` korrigiert.
- **Sprint 1.1** (`9cc68f4`) — Sichtbare E-Mail-Adressen in Impressum/Datenschutz als echte `mailto:`-Links ausgezeichnet.
- **Sprint 2.1 / 2.2** (`59b400b`, `edee572`) — Title + Meta-Description für Start- und Produktseite.
- **Sprint 3** (`b1967ed`) — JSON-LD: `Organization` + `WebSite` auf der Startseite, `Product`/`Offer` auf der Produktseite. Bewusst NICHT ergänzt: `logo`, `sameAs`, `telephone`, `sku`, `availability`, `AggregateRating`/`Review` (keine Datenbasis vorhanden).
- **Sprint 4** (`122cf3c`) — Open Graph + Twitter-Card-Metadaten; Domain `https://intrinse.eu` offiziell als explizite kanonische Domain bestätigt (vorher aus Indizien abgeleitet).
- **Sprint 5** (`b2c82bb`) — Canonical-URLs auf allen 4 Seiten.
- **Sprint 6** (`ad4c404`) — `robots.txt` + `sitemap.xml` im Projekt-Root angelegt.

### Phase 6 — Pre-Launch-Audits & -Fixes
- **SEO-Bestandsaufnahme** (`docs/seo-bestandsaufnahme.md`) — vollständiger Ist-Stand vor den SEO-Sprints, zentrale Feststellung: kein Shopify-Theme, daher viele klassische Shopify-SEO-Fragen nicht anwendbar.
- **Pre-Launch Quality Audit** (`docs/pre-launch-quality-audit.md`) — umfassender QA-Bericht (Design, UX, Performance, Accessibility, SEO, Vertrauen, Premium-Wirkung), Bewertungen 1–10 pro Kategorie, P0–P3-Priorisierung. Launch-Empfehlung: *"JA, nach wenigen Korrekturen."*
- **Pre-launch Fix 1** (`c197e1a`) — Mobiler Horizontal-Scroll-Bug auf `energy.html` behoben. Wichtig: die im QA-Report *vermutete* Ursache (Flexbox `min-width:auto` auf `.wrap`) wurde geprüft und **widerlegt**; tatsächliche Ursache war das Produktbild (`max-width` ohne `width:100%`, Grid-Item schrumpfte nicht mit).
- **Pre-launch Fix 2** (`3583f85`) — Intrinsische `width`/`height`-Attribute für `hero.jpg` (1424×785) und `canister-alt.png` (660×800) ergänzt, zur CLS-Reduktion. Dabei einen selbst verursachten Folgefehler direkt erkannt und korrigiert: `height`-Attribut ohne begleitendes `height:auto` in CSS hätte das Produktbild auf 800px Höhe fixiert (Seitenverhältnis-Bruch) — durch `height:auto` in der Inline-Style behoben.
- **Pre-launch Fix 3** (`2549b3b`) — Impressum/Datenschutz an das Cool-Gray-Designsystem angeglichen (vier CSS-Werte: `--stone`, `nav`-Hintergrund, `body{overflow-x}`, `footer{line-height}`) — kein Redesign, nur Angleichung an bereits bestehende Entscheidungen.
- **Legal Readiness Audit** (Chat, nicht als Datei gespeichert) — Bestandsaufnahme rechtlicher/organisatorischer Seiten. Ergebnis: Impressum & Datenschutz vorhanden; **AGB, Widerrufsbelehrung, Widerrufsformular, Cookie-Consent-Mechanismus, Zahlungsarten-Übersicht fehlen vollständig**; Preisangabe ohne MwSt.-Kontext, Produktseite ohne vollständige Nährwerttabelle.
- **Pre-launch Fix 4 — Preisbereich-Analyse** (Chat, reine Analyse, noch nicht umgesetzt) — konkreter Vorschlag: bereits im CSS vorhandene, aber nie genutzte Klasse `.p-vat` aktivieren. Offene Entscheidung: Formulierung hängt von der tatsächlichen USt.-Situation ab (Regelbesteuerung vs. § 19 UStG) — bewusst nicht vorweggenommen.
- **Cookie-Consent-Strategie** (Chat, reine Analyse, noch nicht umgesetzt) — technische Prüfung ergab: aktuell **keine** Cookies auf irgendeiner Seite (empirisch verifiziert), keine Analytics/Tracking im Code. Einzige Consent-relevante Ressource: Google Fonts (lädt bei jedem Seitenaufruf, IP-Übermittlung an Google). Empfehlung: schlanke, selbstgebaute Consent-Lösung im bestehenden Vanilla-JS-Stil statt schwergewichtiger externer Plattform; native Shopify-Consent-Werkzeuge architektonisch nicht anwendbar (kein Shopify-Theme). Zusatzidee: Google Fonts self-hosten, um den Consent-Bedarf ganz zu eliminieren.
- **Pre-launch Fix 5 — Cookie Consent Implementation** (`Pre-launch Fix 5 – Minimal Cookie Consent`) — Schlanke, selbstgebaute Consent-Lösung in Vanilla JS (`consent.js`, gemeinsam von allen 4 Seiten eingebunden). Gate ausschließlich für Google Fonts (Preconnect + Stylesheet werden erst nach Zustimmung per JS nachgeladen); Shopify-Skript benötigt nachweislich keine Zustimmung (setzt keine Cookies, empirisch verifiziert). Entscheidung persistiert über `localStorage` (`intrinse-consent`), Banner erscheint nur bei Erstbesuch bzw. nach Widerruf. Über das ursprüngliche Briefing hinaus ein "Cookie-Einstellungen"-Link im Footer ergänzt (jederzeitige Widerrufbarkeit als Mindestanforderung bewertet, nicht als Zusatzfeature). Getestet: Desktop/Mobile/Tastatur/Reload/Erstbesuch-Simulation. Dabei entstandener Nebenfehler direkt gefunden und in derselben Änderung behoben: neuer Footer-Link verursachte auf Mobile Umbruch-Overflow (`.f-links` fehlte `flex-wrap`).
- **Pre-launch Fix 6 — Checkout Validation** (QA-Durchlauf, keine Code-Änderung) — Systematische Prüfung des gesamten Checkout-Pfads. Zentrales Ergebnis: die im QA-Audit als "vermutlich Sandboxing-Artefakt" eingestufte Vermutung zum Shopify-Skript-Ladefehler wurde **abschließend widerlegt** — direkter `curl` gegen die reale Shopify-CDN-URL liefert einen echten, von Shopifys eigener Infrastruktur ausgelieferten 404 (Cloudflare-Header, echte Shopify-404-Seite), kein Testumgebungs-Artefakt. Das SDK-Widget kann daher auch in Produktion nicht laden, bis die korrekte, aktuelle Shopify-Embed-URL im Adminbereich geprüft wird. Der Fallback-Mechanismus (`#fallbackBtn`, direkte Warenkorb-Weiterleitung) wurde als zuverlässig funktionierend bestätigt. Aus Sicherheitsgründen keine echte Cross-Domain-Navigation zur Live-Domain ausgelöst, um kein produktives System ungewollt zu beeinflussen.
- **LAUNCH_CHECKLIST.md erstellt** (`docs/LAUNCH_CHECKLIST.md`) — Vom Gründer vorgegebene Checklistenstruktur (Technik/Shop/Recht/Marketing/Soft Launch) mit dem tatsächlichen, verifizierten Projektstand abgeglichen. Neuer Befund dabei: **im gesamten Projekt existiert kein Favicon** (kein `<link rel="icon">`, keine Icon-Datei) — bislang an keiner Stelle thematisiert.
- **Pre-launch Fix 7 — Accessibility Final Pass** (`Pre-launch Fix 7 – Accessibility Final Pass`) — Gezielte, auf real bestätigte Probleme beschränkte Barrierefreiheits-Korrekturen auf allen 4 Seiten; ausdrücklich kein Ziel eines perfekten Lighthouse-Scores, keine optische Veränderung des bestehenden Designsystems. Behoben: fehlender Tastaturfokus-Indikator auf dem zentralen Kaufbutton (`#fallbackBtn` auf `energy.html`, durch `all:unset` vollständig ohne Fokusanzeige) — `:focus-visible`-Outline in `var(--ink)` ergänzt; fehlende Landmark-Struktur (`<main>` auf allen 4 Seiten ergänzt, keine CSS-Kollisionen); fehlende Formular-Labels bei den FOCUS/BALANCE-Notify-Formularen (visuell verstecktes `<label>`, keine optische Änderung); fehlende ARIA-Semantik bei den 5 Wissenswelt-Akkordeon-Elementen (`role="button"` + dynamisches `aria-expanded`, per Klick und Tastatur verifiziert); schwacher Fokus-Indikator der Notify-E-Mail-Felder (`:focus-visible`-Outline ergänzt, bestehende `border-color`-Änderung bleibt erhalten); zu geringer Textkontrast bei `.dec-soon` (FOCUS/BALANCE-Bildunterschriften, 2.73:1 → 4.63:1), `.p-legal` auf `energy.html` (2.05:1 → 4.63:1) und dem Datenschutz-Datumsvermerk ("Stand: Juli 2026", 3.03:1 → 4.61:1) — jeweils nur Opazität einer bestehenden Farbe erhöht, keine neue Farbe eingeführt. Bewusst NICHT geändert: Kontrast der "BALANCE."-Überschrift (Markenfarbe `--balance`, 2.08:1) — selbst bei Opazität 1.0 werden rechnerisch nur 2.65:1 erreicht, eine echte Behebung wäre nur durch Änderung des Farbwerts selbst möglich, was der expliziten Vorgabe "keine neuen Farben" widerspräche; Kontrast des "Benachrichtige mich"-Buttons (2.94:1) — die zurückhaltende Opazität dieses Elements war eine explizite, in dieser Session getroffene Design-Entscheidung des Gründers, deren Rücknahme ohne Rückfrage der Vorgabe "bestehende Gestaltung besitzt höchste Priorität" widersprochen hätte. Vollständig verifiziert per Playwright: Tab-Reihenfolge auf allen 4 Seiten, Tastaturaktivierung der Akkordeons (Enter), Fokus-Sichtbarkeit aller relevanten interaktiven Elemente, Mobile (390 px, kein neuer Overflow), Konsole fehlerfrei.
- **Pre-launch Fix 8 — Resolve mobile scroll jank on ENERGY page** (`Pre-launch Fix 8 – Resolve mobile scroll jank on ENERGY page`) — Reproduzierter Fehler: auf `energy.html` ruckelten/sprangen "STATES", "ENERGY." und "Calm activation." beim Zurückscrollen zum Preis-/CTA-Bereich auf Mobile (getestet 390×844, 393×852, 430×932). Root Cause empirisch bestätigt (Playwright, Bounding-Rect- und `classList`-Protokollierung über mehrere Scroll-Zyklen): der `IntersectionObserver` in `energy.html` entfernte die Klasse `vis` jedes Mal, wenn ein `.sr`-Element den Viewport verließ — auch nach oben. Da `.frame{min-height:auto}` auf Mobile greift, ist der `#product`-Bereich höher als ein Viewport; bereits das Scrollen zum Preis-/CTA-Bereich schiebt den Kopfbereich (STATES/ENERGY/Calm activation.) aus dem sichtbaren Bereich, wodurch `vis` entfernt wurde. Beim Zurückscrollen wurde die 1s-Reveal-Transition (Opacity/TranslateY) dadurch jedes Mal neu abgespielt — das war das beobachtete Ruckeln/Springen. Kein Performance-/Compositing-Problem, keine Bild-/Font-Ladeursache, keine Sticky-/Fixed-Interferenz. Kleinstmöglicher Fix (reines JS, keine CSS-Änderung): im `IntersectionObserver`-Callback wird `vis` nur noch beim ersten Sichtbarwerden gesetzt und das Element danach per `io.unobserve()` nicht mehr weiter beobachtet — die initiale Eintrittsanimation bleibt unverändert, ein erneutes Entfernen/Wiederabspielen ist strukturell ausgeschlossen. Änderung ist auf `energy.html` beschränkt (eigene, unabhängige Kopie des Observer-Codes; `index.html` unberührt). Verifiziert: 5 Scroll-Zyklen (abwechselnd langsam/schnell) auf allen 3 Mobile-Viewports, Halten am CTA-Bereich, Reload, Tablet (820×1180), Desktop (1440×900) — überall stabil (`opacity:1`, keine Transform-Restauration, feste Position), keine Regression an Produktbild/Preis/Button/Navigation, kein horizontaler Overflow, Konsole fehlerfrei.

---

## 3. Offene Punkte (Stand: 2026-07-31, nach Pre-launch Fix 7)

Vom Gründer am 2026-07-31 explizit bestätigter Status (zum Zeitpunkt der ursprünglichen Erfassung): **Phase Pre-Launch**, letzter abgeschlossener Sprint **Pre-launch Fix 3**. Seither zusätzlich abgeschlossen: **Fix 5** (Cookie Consent Implementation), **Fix 6** (Checkout Validation, QA), **LAUNCH_CHECKLIST.md**, **Fix 7** (Accessibility Final Pass).

### Launch-Blocker (explizit vom Gründer benannt)

| Punkt | Status | Quelle |
|---|---|---|
| Widerrufsbelehrung | Fehlt vollständig | Legal Readiness Audit, QA-Audit P0 |
| Widerrufsformular | Fehlt vollständig | Legal Readiness Audit, QA-Audit P0 |
| Cookie Consent (Implementierung) | **Umgesetzt und getestet (Fix 5).** Kein offener Punkt mehr. | Pre-launch Fix 5 |
| Checkout-Livetest auf echter Domain | Noch nicht durchgeführt. Ursache des Shopify-Skript-Ladefehlers ist inzwischen **abschließend geklärt** (kein Sandboxing-Artefakt mehr, siehe unten) — der eigentliche Livetest auf `intrinse.eu` steht weiterhin aus. | QA-Audit P0, Pre-launch Fix 6 |
| Shopify-Buy-Button-Skript-URL liefert 404 | **Bestätigter Fehler** (nicht mehr nur Vermutung): die im Code hinterlegte SDK-Skript-URL wird von Shopifys eigener CDN-Infrastruktur mit einem echten 404 beantwortet. Muss vor Launch im Shopify-Adminbereich durch die korrekte, aktuelle Embed-URL ersetzt werden. Fallback-Mechanismus funktioniert zuverlässig als Übergangslösung. | Pre-launch Fix 6 |

### Nicht launch-blockierend (explizit vom Gründer zurückgestellt)

| Punkt | Status | Quelle |
|---|---|---|
| Bildoptimierung | Bewusst zurückgestellt | QA-Audit P1 |
| WebP/AVIF | Bewusst zurückgestellt | QA-Audit P1/P3 |
| `srcset` | Bewusst zurückgestellt | QA-Audit P1 |

### Weitere offene Punkte (noch nicht priorisiert bestätigt)

| Punkt | Status | Quelle |
|---|---|---|
| AGB | Fehlt vollständig | Legal Readiness Audit |
| MwSt.-Hinweis beim Preis (`.p-vat` aktivieren) | **Formulierung jetzt geklärt:** Geschäftsmodell nutzt die Kleinunternehmerregelung (§ 19 UStG) → Text muss den § 19 UStG-Hinweis verwenden, nicht "inkl. MwSt." Technische Umsetzung noch offen. | Pre-launch Fix 4 + Geschäftsentscheidungen 2026-07-31 |
| Zahlungsarten-Übersicht | Fehlt | Legal Readiness Audit |
| Vollständige Nährwerttabelle auf `energy.html` | Fehlt (Daten liegen intern vor, nicht veröffentlicht) | Legal Readiness Audit |
| Cross-Browser-Test (echtes Safari/Firefox) | Letzter vollständiger Durchgang liegt zurück; finaler QA-Audit deckte nur Chromium ab | QA-Audit P2 |
| Ungenutztes Asset `img/canister-energy.png` (835 KB) | Kann entfernt werden, kein Laufzeit-Impact | QA-Audit P2 |
| Favicon | Fehlt im gesamten Projekt vollständig (kein `<link rel="icon">`, keine Icon-Datei). Kleiner, schneller Fix. | LAUNCH_CHECKLIST.md |
| Kontrast "BALANCE."-Markenfarbe (`--balance`) | 2.08:1 gegen den Kartenhintergrund, auch bei voller Opazität nur rechnerisch 2.65:1 erreichbar — echte Behebung erfordert eine Anpassung des Farbwerts selbst, was eine bewusste Design-/Geschäftsentscheidung ist und nicht im Rahmen einer reinen Accessibility-Korrektur getroffen wurde. | Pre-launch Fix 7 |
| Kontrast "Benachrichtige mich"-Button | 2.94:1, unter dem AA-Zielwert. Bewusst nicht verändert, da die geringe Opazität eine explizite, kürzlich getroffene Design-Entscheidung des Gründers ist (siehe Fix 7). Steht zur bewussten Entscheidung durch den Gründer offen, falls Kontrast Priorität vor der aktuellen Zurückhaltung bekommen soll. | Pre-launch Fix 7 |

---

## 5. Bestätigte Geschäftsentscheidungen (2026-07-31)

- **Geschäftsmodell:** Soft Launch mit 200 Dosen, Einzelunternehmen unter der Kleinunternehmerregelung (§ 19 UStG). Nach erfolgreichem Test: UG-Gründung geplant.
- **Pricing:** ENERGY 44 €, bewusste Premiumpositionierung, keine Rabattstrategie.
- **Produktreihenfolge:** ENERGY → FOCUS → BALANCE → PURITY (neu, viertes Produkt, bisher nirgends im Code erwähnt).
- **Technischer Ansatz bestätigt als dauerhaft, nicht als Zwischenstand:** kein Shopify-Theme, statische Website, Leitprinzip "Wissen vor Verkauf".

---

## 4. Referenzen

- Domain: `https://intrinse.eu`
- Kontakt: `hello@intrinse.eu`
- Verantwortlich: Gordon Owens Mason, Hangäckerhöfe 5, 69126 Heidelberg
- Kern-Design-Tokens: `--stone:#d9dadb`, `--paper:#ecedee`, `--ink:#1c1c1a`, `--ink-soft:#4a4845`, `--energy:#9c523c`, Schriftart `Jost`
- Weitere Berichte: `docs/seo-bestandsaufnahme.md`, `docs/pre-launch-quality-audit.md`

---

## 6. Aktuelle Roadmap (Stand: 2026-07-31, nach Pre-launch Fix 7)

### Phase
Pre-Launch.

### Aktuelle Aufgabe
Launch Readiness — Abarbeitung der in Abschnitt 3 gelisteten Launch-Blocker.

### Nächster Sprint (Empfehlung, noch nicht vom Gründer bestätigt)
**Widerruf ergänzen** — Widerrufsbelehrung + Widerrufsformular. Begründung: einziger verbleibender Launch-Blocker ohne Abhängigkeit von einem externen Konto (im Unterschied zum Shopify-URL-Fix, der Zugriff auf den Shopify-Adminbereich voraussetzt) und damit sofort umsetzbar.

### Danach (Empfehlung)
**Shopify-Buy-Button-Skript-URL korrigieren** (setzt Prüfung im Shopify-Adminbereich voraus, siehe Fix 6) + **Zahlungsarten-Übersicht** ergänzen + **MwSt.-Hinweis** (`.p-vat`) aktivieren, Formulierung bereits geklärt (§ 19 UStG, siehe Abschnitt 5). Drei kleine, voneinander unabhängige technische Ergänzungen.

### Langfristig
Manuelle Testbestellung auf `intrinse.eu`, Cross-Browser-Kontrolle (Safari/Firefox), Favicon ergänzen — danach Soft Launch mit 200 Dosen gemäß bestätigter Geschäftsentscheidung (Abschnitt 5).

---

## Launch Ready wenn

- [ ] **Checkout funktioniert** — offen. Shopify-Buy-Button-Skript liefert einen bestätigten 404 (Fix 6); der Fallback-Mechanismus funktioniert zuverlässig, ersetzt aber keinen echten SDK-Checkout.
- [ ] **Rechtstexte vollständig** — offen. Widerrufsbelehrung und Widerrufsformular fehlen vollständig (Legal Readiness Audit). Impressum und Datenschutz sind vollständig und designangeglichen.
- [x] **Cookie Consent** — erledigt. Implementiert und vollständig getestet (Fix 5).
- [ ] **Shopify eingebunden** — teilweise. SDK ist im Code konfiguriert (Domain, Storefront-Token, Variant-ID), die Skript-URL lädt aber nicht (siehe Checkout). Erst nach URL-Korrektur vollständig.
- [ ] **Testbestellung erfolgreich** — offen. Bewusst noch nicht durchgeführt (Fix 6), um kein produktives System ungewollt zu beeinflussen.
- [ ] **Domain live** — nicht aus dem Code feststellbar. Reine Hosting-/DNS-Frage.
- [ ] **Search Console** — nicht aus dem Code feststellbar. Externe Kontoeinrichtung.
- [ ] **Analytics** — nicht vorhanden. Aktuell kein Tracking/Analytics im Code (empirisch verifiziert im Rahmen der Cookie-Consent-Analyse). Ob das für den Launch gewünscht ist, ist eine offene Entscheidung des Gründers, keine Codebasis-Aufgabe im engeren Sinn.
- [ ] **Soft Launch vorbereitet** — teilweise. Geschäftsentscheidung bestätigt (200 Dosen, Abschnitt 5); organisatorische Vorbereitung (Freunde, Coaches, Feedback-Prozess) ist nicht aus dem Code feststellbar.
