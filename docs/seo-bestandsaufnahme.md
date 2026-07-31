# SEO-Bestandsaufnahme INTRINSE — technischer Bericht

**Bevor der Bericht beginnt, eine zentrale Feststellung, die fast alle folgenden Punkte einordnet:**

> Dieses Projekt ist **kein Shopify-Theme**. Der komplette Ordner enthält ausschließlich vier statische HTML-Dateien (`index.html`, `energy.html`, `impressum.html`, `datenschutz.html`) plus drei Bilder. Es gibt kein Liquid, keine `templates/`, `sections/`, `snippets/`, kein `robots.txt.liquid`, kein `sitemap.xml.liquid`, kein `locales/`-Verzeichnis, kein `config/settings_schema.json`. Shopify wird ausschließlich über das **Buy Button JS SDK** eingebunden (`energy.html:10`, `132–174`) — ein rein clientseitiges Checkout-Widget, das beim Kauf auf eine von Shopify gehostete Cart-/Checkout-URL verweist. Warenkorb, Checkout, Kundenkonto, Such- und Collection-Seiten existieren **nicht in dieser Codebasis** — sie liegen, falls überhaupt vorhanden, vollständig außerhalb unseres Zugriffs auf der Shopify-Plattform.

Das ändert nicht *dass* eine SEO-Prüfung sinnvoll ist, aber *was* geprüft werden kann. Ich beantworte jede Frage so genau wie im Code feststellbar und kennzeichne alles, was außerhalb der Codebasis liegt, ausdrücklich als **Grau**.

---

## A. Zusammenfassung

Die Seite hat ein durchdachtes, konsistentes Markenerlebnis, aber praktisch keine technische On-Page-SEO-Infrastruktur. Titles existieren und sind sinnvoll formuliert, aber Meta-Descriptions, Canonicals, Open-Graph-Tags, Twitter-Cards und strukturierte Daten (JSON-LD) **fehlen auf allen vier Seiten vollständig** — keine einzige Ausnahme. Die Produktseite hat **keine einzige Überschrift** (kein H1, kein H2, kein H4 — der Produktname ist ein `<div>`). Die Startseite hat **kein H1**. Die zehn Zutaten-Tiefenprofile und die fünf Qualitäts-Kapitel — inhaltlich der wertvollste Teil der Seite — sind alle nur als Fragment-Anker innerhalb der einen `index.html` erreichbar und teilen sich deren Title, Meta und URL; sie können in Suchergebnissen nicht einzeln erscheinen. Zwei Seiten (`impressum.html`, `datenschutz.html`) verweisen intern auf einen nicht mehr existierenden Anker (`#shop` statt `#decision`) und enthalten einen funktionslosen `mailto:`-Link.

---

## B. Bereits korrekt umgesetzt (Grün)

| Punkt | Fundstelle | Bewertung |
|---|---|---|
| `lang="de"` auf allen 4 Seiten gesetzt | `index.html:2`, `energy.html:2`, `impressum.html:2`, `datenschutz.html:2` | Konsistent, korrekt |
| Individuelle, nicht-generische `<title>` pro Seite, Markenname manuell auf allen 4 Seiten enthalten | siehe Abschnitt 1 | Kein Titel besteht nur aus "ENERGY" oder "Reveal what is within" — Sorge des Auftraggebers trifft nicht zu |
| Keine doppelten `<title>`-Werte zwischen den 4 physischen Seiten | s.u. | — |
| Interne Navigation nutzt durchgehend relative, echte `<a href>`-Links (keine harten Absolut-URLs, kein `javascript:void(0)`) | alle 4 Dateien | Google kann jeden Link normal crawlen |
| Der Pfeil-CTA auf der Startseite (`→`) steht **innerhalb** desselben `<a>` wie "ENERGY." und "Calm activation." | `index.html:658–662` | Kein bedeutungsloser Linktext isoliert — Accessible Name des Links ist "ENERGY. Calm activation. →" |
| Beide vorhandenen `<img>`-Tags haben nicht-leere, sinnvolle `alt`-Texte | `index.html:226`, `energy.html:115` | — |
| Bag-Icon (SVG, rein dekorativ neben Textlink) hat `aria-label="Shop"` am umschließenden Link | `index.html:219`, `energy.html:89` | — |
| Keine sichtbaren Testinhalte / Lorem-Ipsum / GitHub-Preview-Verweise im sichtbaren Content | alle 4 Dateien | — |
| Shopify-Konfiguration im Buy-Button-Script enthält reale Werte, keine Platzhalter (`domain`, `storefrontAccessToken`, `variants.ENERGY` sind befüllt, nicht `'YOUR_...'`) | `energy.html:132–137` | Checkout ist technisch angebunden |
| Interne Verlinkung: keine verwaisten Seiten — alle 4 Seiten sind von mindestens einer anderen Seite aus erreichbar | Linkgraph unten | — |

---

## C. Teilweise umgesetzt (Gelb)

### 1. Title-Tags

| Seite | Datei/Zeile | Aktueller Wert | Bewertung |
|---|---|---|---|
| Startseite | `index.html:6` | `INTRINSE — Reveal what is within.` | Markentreu, aber ohne jeden Sachbegriff (keine Erwähnung von "Protein", "Supplement", Zielgruppe). Für die Startseite als Marken-/Museumserlebnis vertretbar, aber schwach für Nicht-Marken-Suchanfragen. |
| Produktseite (ENERGY) | `energy.html:6` | `INTRINSE — ENERGY` | Deutlich zu dünn für eine Produktseite. Keine Erwähnung von Proteinpulver, Guarana, L-Theanin, Größe oder Nutzen — genau die Begriffe, nach denen potenzielle Käufer suchen würden. |
| Impressum | `impressum.html:6` | `Impressum — INTRINSE` | Für eine Rechtsseite angemessen, kein Handlungsbedarf. |
| Datenschutz | `datenschutz.html:6` | `Datenschutz — INTRINSE` | Wie oben, angemessen. |
| Collections / Blogseiten / Artikel / Warenkorb / Suchseite | — | — | **Existieren nicht als eigene Seiten** (siehe Kopf des Berichts). Die 10 Zutaten- und 5 Qualitäts-"Artikel" sind Fragment-Anker in `index.html` und **teilen sich deren Title** — sie können keinen eigenen Title tragen, solange sie keine eigene URL haben. |

**Wird der Markenname automatisch ergänzt?** Nein — es gibt keine Template-Logik dafür (kein Shopify, keine gemeinsame Head-Includedatei). Der Markenname ist auf jeder der 4 Seiten **manuell** in den Titel-String geschrieben. Das funktioniert aktuell konsistent, ist aber fehleranfällig: Wird künftig eine fünfte Seite ergänzt, muss der Titel jedes Mal von Hand korrekt gesetzt werden — es gibt keinen Mechanismus, der das erzwingt.

### 6. Interne Links — generische Linktexte

| Linktext | Fundstelle | Bewertung |
|---|---|---|
| "MEHR INFORMATIONEN →" / "SCHLIESSEN →" | `index.html:266, 367, 390, 559, 586` | Kein `<a>`, sondern `<div class="k-row" tabindex="0">` mit `onclick`/`onkeydown` (JS-Accordion, `index.html:729–732`). Kein echter Navigations-Link (kein Seitenwechsel), daher kein "kaputter Link" — aber der Linktext selbst ist generisch. Da es sich um ein Akkordeon (Inhalt bleibt im DOM) und nicht um Lazy-Load-Content handelt, ist der Text für Crawler trotzdem lesbar. |
| "SHOP" (Nav) | `index.html:218`, `energy.html:88` | Generisch, aber im Kontext (Hauptnavigation, Shopping-Bag-Icon direkt daneben) eindeutig. Kein aria-label vorhanden, aber auch nicht nötig, da der sichtbare Text bereits eindeutig ist. |
| "→" als alleinstehendes Zeichen | Nur an einer Stelle im Code als isoliertes `<span>` **ohne eigenen Link**: `index.html:661` — liegt aber, wie oben erwähnt, innerhalb des größeren "ENERGY."-Links, ist also kein eigenständiger Link mit nur einem Pfeil als Name. | Kein Problem. |
| "← STATES" (Zurück-Link auf Produktseite) | `energy.html:96` | Echter `<a href="index.html#decision">`. Visuell ein Rücklink, semantisch aber nur ein normaler Link ohne `rel`- oder Breadcrumb-Auszeichnung (siehe Abschnitt 7). |

### 11. Bilder

| Punkt | Fundstelle | Bewertung |
|---|---|---|
| `alt`-Texte vorhanden und sinnvoll | `index.html:226`, `energy.html:115` | Grün |
| `width`/`height` gesetzt | Nirgends gesetzt | Gelb — beide `<img>` haben weder `width` noch `height`-Attribute, nur CSS. Erhöht das Risiko von Cumulative Layout Shift, besonders bei `hero.jpg` (1424×785, 596 KB) beim Laden. |
| Lazy Loading | Kein `loading="lazy"` oder `loading="eager"` gesetzt | Gelb — für das above-the-fold Hero-Bild ist `eager`/kein Attribut unkritisch (Browser-Default ist ohnehin `auto`≈eager für sichtbare Bilder), aber explizit zu setzen wäre sauberer. |
| Dateigröße | `hero.jpg` 596 KB, `canister-alt.png` 449 KB, `canister-energy.png` 815 KB | Gelb — kein WebP/AVIF, kein responsives `srcset`, keine Kompressionsprüfung im Rahmen dieser Bestandsaufnahme durchgeführt. `canister-energy.png` (815 KB) wird zusätzlich **von keiner der 4 Seiten referenziert** — totes Asset, kein direkter SEO-Effekt, aber unnötiges Repo-Gewicht. |
| Dekorative Bilder mit korrekt leerem `alt=""` | — | Nicht feststellbar/nicht anwendbar — es gibt nur die zwei o.g. `<img>`-Tags, beide sind inhaltstragend, keine rein dekorativen `<img>` vorhanden (dekorative Flächen sind CSS-Gradients, kein `<img>`). |

### 12. Technische Qualität

| Punkt | Befund |
|---|---|
| Doppelte Meta-Tags | Keine gefunden — es gibt so gut wie keine Meta-Tags (nur `charset`, `viewport`), daher auch keine Duplikate möglich. |
| Ungültiges HTML im Head | Keine Auffälligkeiten in den 4 `<head>`-Blöcken (`index.html:3–211`, `energy.html:3–81`, `impressum.html:3–37`, `datenschutz.html:3–41`) — Struktur ist valide. |
| Fehlende Sprachangabe | Nicht zutreffend — überall gesetzt (s.o., Grün). |
| Harte URLs statt "Shopify-Routen" | Nicht anwendbar in diesem Sinn (kein Shopify-Theme, also keine Liquid-`url`-Filter verfügbar) — interne Links sind aber bereits relativ und portabel, das ist die für diese Architektur richtige Lösung. |
| Unnötige Scripts/Apps | Nur Google Fonts (2× `preconnect` + 1 Stylesheet-Link, alle 4 Seiten) und auf `energy.html` das Shopify Buy-Button-Skript (`defer`, unkritisch). Keine erkennbaren Tracking-Skripte, keine ungenutzten Drittanbieter-Apps. |

---

## D. Fehlt (Rot)

### 1. Title-Tags — Fehlende Seitentypen
Blog/Knowledge-Artikel, Warenkorb, Suchseite, Collections: **existieren nicht als eigene URLs**, daher auch keine eigenen Titel möglich. Das ist kein "Bug", aber eine strukturelle SEO-Grenze, die im Bericht klar benannt werden muss.

### 2. Meta-Descriptions
**Auf keiner der 4 Seiten vorhanden.** Durchsucht: `grep -rniE 'meta name="description"' *.html` → 0 Treffer.
- Verantwortliche Datei: keine — es gibt keinen Erzeugungsmechanismus, weder global noch pro Seite.
- Kein Fallback vorhanden, weil kein Mechanismus existiert, der einen Fallback bräuchte.
- Folge: Google generiert die Snippet-Beschreibung in der Suche automatisch aus dem Seiteninhalt — nicht kontrollierbar, potenziell inkonsistent mit der Markensprache.
- Ist die Description "pro Seite individuell pflegbar"? Ja, rein technisch (jede Seite ist eine eigenständige HTML-Datei, ein `<meta name="description">` könnte pro Seite frei gesetzt werden) — es ist nur schlicht noch keine vorhanden.

### 3. Canonical URLs
**Kein `<link rel="canonical">` auf irgendeiner der 4 Seiten.** `grep -rni "canonical" *.html` → 0 Treffer.
- Praktisches Risiko hier ist gering, da es keine Parameter-URLs, Varianten- oder Filter-Duplikate im Theme selbst gibt — aber ohne Canonical ist z. B. nicht explizit geklärt, ob `index.html` oder `/` (falls beide erreichbar sind) als die kanonische Version gelten soll. Das ist eine Frage der Hosting-Konfiguration, nicht im Code feststellbar (**Grau**).

### 4. Robots und Indexierbarkeit
- Keine `robots.txt` im Repository (`find . -name "robots.txt*"` → 0 Treffer).
- Kein `<meta name="robots">` auf irgendeiner Seite.
- Damit: keine noindex-Fehler möglich (weil nichts gesetzt ist), aber auch keinerlei explizite Steuerung. Ob der Hosting-Provider (nicht aus dem Repo ersichtlich, ob GitHub Pages, Vercel, Netlify o.ä.) eine eigene `robots.txt` automatisch generiert, ist **nicht feststellbar** und muss außerhalb des Codes geprüft werden.

### 5. Sitemap
- Keine `sitemap.xml` im Repository.
- Da dies **kein Shopify-Storefront-Theme** ist, greift die "normale Shopify-Sitemap" hier nicht — die existiert nur für Shopify-gehostete Storefronts, nicht für eine separat gehostete statische Seite, die Shopify nur für den Checkout nutzt. Ob eine Sitemap auf Hosting-Ebene erzeugt wird, ist **nicht feststellbar** (Grau).
- Risiko: Ohne Sitemap müssen Suchmaschinen alle 4 Seiten rein über die interne Verlinkung finden — funktioniert hier, da der Linkgraph vollständig verbunden ist (siehe Abschnitt B), aber es gibt keinerlei Signal an Google, *wann* sich eine Seite zuletzt geändert hat.

### 7. Breadcrumbs
- Keine sichtbaren Breadcrumbs im klassischen Sinn ("Start > Kategorie > Produkt").
- "← STATES" (`energy.html:96`) ist ein reiner **visueller Rücklink**, kein semantischer Breadcrumb — kein `<nav aria-label="breadcrumb">`, keine Liste, kein `BreadcrumbList`-Markup.
- Kein `BreadcrumbList`-JSON-LD irgendwo im Code (0 Treffer für `application/ld+json` insgesamt, siehe Abschnitt 8).

### 8. Strukturierte Daten / JSON-LD
**Vollständig nicht vorhanden — auf keiner der 4 Seiten.** `grep -rni "application/ld+json" *.html` → 0 Treffer.
- Kein `Organization`, kein `WebSite`, kein `Product`/`Offer` (obwohl `energy.html` eine echte Produktseite mit Preis, Name, Bild und Kaufoption ist — das ist die auffälligste Lücke), kein `BreadcrumbList`, kein `Article`/`BlogPosting`, keine `FAQPage`, keine `SearchAction`.
- Da explizit gefordert: **keine Bewertungen/Sterne erfunden** — es gibt ohnehin keine Rezensionsfunktion im Theme, also auch keine Datenquelle dafür.
- Produktdaten, die für ein `Product`/`Offer`-Schema *bereits im Code vorhanden* wären und nur noch strukturiert ausgezeichnet werden müssten:
  - `name`: "ENERGY." (`energy.html:99`, aktuell `<div class="p-name">`)
  - `image`: `img/canister-alt.png` (`energy.html:115`)
  - `description`: `energy.html:100–101` ("Calm activation." / Fließtext)
  - `price`: "44 €" (im Code als `.p-price` erwartet — Preis ist im sichtbaren HTML vorhanden)
  - `priceCurrency`: EUR (implizit aus "€", nirgends als ISO-Code `EUR` explizit hinterlegt)
  - `sku`, `brand`, `availability`, `itemCondition`, `url`: **nicht im Code vorhanden**, müssten neu ergänzt werden
  - Variant-Handling: nicht zutreffend, es gibt nur eine Variante (ENERGY, 475 g)

### 9. Open Graph und Social Metadata
**Vollständig nicht vorhanden.** `grep -rniE 'meta property="og|meta name="twitter'` → 0 Treffer auf allen 4 Seiten.
- Keine `og:title`, `og:description`, `og:image`, `og:url`, `og:type`.
- Keine Twitter/X-Card-Tags.
- Praktische Folge: Wird ein Link zu `index.html` oder `energy.html` in Social Media, WhatsApp, Slack etc. geteilt, entsteht **keine Vorschau-Karte** (kein Bild, kein kuratierter Text) — die Plattformen zeigen bestenfalls einen rohen Linktext.

---

## E. Kritische Fehler (Rot)

1. **Produktseite ohne jede Überschrift.** `energy.html` enthält **kein einziges** `<h1>`–`<h6>`-Element (`grep -n "<h[1-6]" energy.html` → 0 Treffer). Der Produktname "ENERGY." ist ein `<div class="p-name">` (`energy.html:99`). Für die kommerziell wichtigste Seite der gesamten Site ist das ein struktureller SEO-Fehler ersten Ranges — Google gewichtet H1-Inhalte stark für das Seitenthema.

2. **Startseite ohne H1.** `index.html` hat keine `<h1>`, sondern startet direkt mit `<h2>` (`index.html:232`, Philosophie-Satz) und überspringt danach H3 komplett zugunsten von `<h4>` (75+ Vorkommen). Die Hierarchie ist damit nicht nur unvollständig (fehlendes H1), sondern auch strukturell unlogisch (H2 → H4 ohne H3).

3. **Kaputte interne Anker-Links auf zwei Seiten.** `impressum.html:44` und `impressum.html:75` sowie `datenschutz.html:48` und `datenschutz.html:112` verlinken auf `index.html#shop` — dieser Anker existiert auf `index.html` **nicht mehr** (die Sektion heißt seit einer früheren Überarbeitung `id="decision"`, nicht `id="shop"`). Der Klick landet ohne Fehlermeldung einfach am Seitenanfang von `index.html`, nicht beim Shop-Bereich — ein stiller UX- und Link-Fehler.

4. **Funktionsloser Kontakt-Link.** `impressum.html:75` und `datenschutz.html:112` enthalten `<a href="mailto:">[Kontakt]</a>` — ein `mailto:`-Link ohne Adresse mit sichtbarem Platzhaltertext `[Kontakt]` in eckigen Klammern. Öffnet das Mailprogramm ohne Empfänger.

5. **Footer-Inkonsistenz.** Dieselben zwei Seiten beschriften den Wissenswelt-Link im Footer mit "Knowledge" (`impressum.html:75`, `datenschutz.html:112`), während `index.html` und `energy.html` konsistent "Wissenswelt" verwenden.

---

## F. Empfohlene Reihenfolge der Änderungen

1. **H1 auf Produkt- und Startseite ergänzen** (E.1, E.2) — höchste Priorität, da es sich um einen Grundpfeiler des On-Page-SEO handelt und die am einfachsten zu behebende Lücke ist.
2. **Kaputte `#shop`-Anker und `mailto:`-Platzhalter beheben** (E.3, E.4, E.5) — sind reine Bugs, kein Abwägungsspielraum nötig, schnell behebbar.
3. **Meta-Description + Open-Graph-Tags pro Seite ergänzen** (D.2, D.9) — größter Hebel für Klickrate in Suchergebnissen und Social-Previews, keine strukturellen Änderungen nötig.
4. **`Product`/`Offer`-JSON-LD auf `energy.html`** (D.8) — direkter Rich-Snippet-Nutzen (Preis/Verfügbarkeit in der Suche).
5. **Canonical-Tags ergänzen** (D.3) — geringer Aufwand, sinnvolle Absicherung.
6. **Überschriften-Hierarchie auf `index.html` korrigieren** (H2→H3→H4 statt H2→H4) — mittlerer Aufwand, da viele Stellen betroffen sind.
7. **Strukturelle Entscheidung zu den Knowledge-/Zutaten-Inhalten treffen**: bewusst als Ein-Seiten-Erlebnis belassen (dann ist das kein Fehler, sondern eine Designentscheidung, die dokumentiert werden sollte) oder langfristig eigene URLs pro Kapitel einführen, falls einzelne Zutaten-Tiefenprofile eigenständig in der Suche auffindbar sein sollen. Das ist eine strategische, keine rein technische Frage.
8. **`sitemap.xml`/`robots.txt` auf Hosting-Ebene klären** (D.4, D.5) — abhängig von der tatsächlichen Hosting-Plattform, außerhalb dieser Codebasis zu prüfen.

---

## G. Betroffene Dateien

| Datei | Betroffen von |
|---|---|
| `index.html` | B, C.1, C.6, C.11, C.12, D.2, D.3, D.4, D.7, D.8, D.9, E.2 |
| `energy.html` | B, C.1, C.11, D.2, D.3, D.8, D.9, E.1 |
| `impressum.html` | C.1, D.2, D.3, E.3, E.4, E.5 |
| `datenschutz.html` | C.1, D.2, D.3, E.3, E.4, E.5 |
| *(kein `robots.txt`, keine `sitemap.xml` im Repo vorhanden — ggf. neu anzulegen, Hosting-abhängig)* | D.4, D.5 |

---

## H. Konkrete Codebeispiele (nur zur Veranschaulichung — keine Datei wurde verändert)

**H1 auf `energy.html` ergänzen** (aktuell `energy.html:99`):
```html
<!-- vorher -->
<div class="p-name sr sr-d1">ENERGY.</div>

<!-- Beispiel -->
<h1 class="p-name sr sr-d1">ENERGY.</h1>
```

**Meta-Description + Open Graph, Beispiel für `energy.html:6`:**
```html
<title>INTRINSE — ENERGY</title>
<meta name="description" content="ENERGY: pflanzliches Proteinpulver mit Guarana und L-Theanin. Ruhige Aktivierung für anhaltende Energie. 475 g, vegan.">
<meta property="og:title" content="INTRINSE — ENERGY">
<meta property="og:description" content="Ruhige Aktivierung für anhaltende Energie. Pflanzliches Proteinpulver mit Guarana und L-Theanin.">
<meta property="og:image" content="https://[domain]/img/canister-alt.png">
<meta property="og:type" content="product">
<meta property="og:url" content="https://[domain]/energy.html">
<link rel="canonical" href="https://[domain]/energy.html">
```

**Product/Offer JSON-LD, Beispiel für `energy.html`:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "INTRINSE ENERGY",
  "image": "https://[domain]/img/canister-alt.png",
  "description": "Pflanzliches Proteinpulver mit Guarana und L-Theanin. 475 g.",
  "brand": { "@type": "Brand", "name": "INTRINSE" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "price": "44.00",
    "availability": "https://schema.org/InStock",
    "url": "https://[domain]/energy.html"
  }
}
</script>
```

**Kaputten Anker + Kontakt-Link auf `impressum.html`/`datenschutz.html` beheben:**
```html
<!-- vorher, z.B. impressum.html:75 -->
<a href="index.html#shop">Shop</a><a href="index.html#knowledge">Knowledge</a>...<a href="mailto:">[Kontakt]</a>

<!-- Beispiel -->
<a href="index.html#decision">Shop</a><a href="index.html#knowledge">Wissenswelt</a>...<a href="mailto:hello@intrinse.eu">Kontakt</a>
```

---

Sag Bescheid, welchen Punkt aus Abschnitt F ich zuerst umsetzen soll — es wurde in diesem Schritt bewusst nichts verändert.
