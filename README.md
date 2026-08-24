# The Pursuit Unit Converter

A static web page that converts **kilometers** to **international miles** and the reverse. There is no framework, bundler, or backend—open one HTML file (served over HTTP) and convert.

The app is branded **The Pursuit Unit Converter** and styled with a cream, blue, coral, and chartreuse palette.

## Features

- Convert **kilometer [km]** ↔ **mile [mi, mi(Int)]** as you type in either From or To
- **Swap** units (and current values) with the arrow control on the converter card
- **Convert** recalculates from the last field you edited
- **Clear** empties both fields and the result line
- A **kilometer-to-mile table** for 0.01 km through 1000 km
- A short **how-to** with the exact factors and a 15 km example

## Quick start

Serve the repository root with any static file server. Do **not** open `unit-converter.html` as a `file://` URL—the stylesheet and script will not load.

```bash
python3 -m http.server 8000
```

Then open:

[http://localhost:8000/unit-converter.html](http://localhost:8000/unit-converter.html)

Any other static server pointed at this directory works the same way (for example `npx serve .` if you already have Node). There is nothing to install for the converter itself.

## Deploy

The site is a static GitHub Pages app. After Pages is enabled with **GitHub Actions** as the source, pushes to `main` publish:

- [https://ariletice.github.io/KM-Mile-Unit-Converter/](https://ariletice.github.io/KM-Mile-Unit-Converter/)
- [https://ariletice.github.io/KM-Mile-Unit-Converter/unit-converter.html](https://ariletice.github.io/KM-Mile-Unit-Converter/unit-converter.html)

Workflow: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). It copies `index.html`, `unit-converter.html`, `unit-converter.css`, and `unit-converter.js` into the Pages artifact. `index.html` redirects `/` to the converter.

To enable hosting (one-time, repo admin):

1. GitHub repo **Settings → Pages**
2. **Source:** GitHub Actions

Then re-run the **Deploy GitHub Pages** workflow if the first run failed before Pages was enabled.

## Project structure

| File | Role |
| --- | --- |
| [unit-converter.html](unit-converter.html) | Markup: converter card, conversion table, how-to copy, Google Fonts, and links to CSS/JS |
| [unit-converter.css](unit-converter.css) | Layout and branding (CSS custom properties, card, table) |
| [unit-converter.js](unit-converter.js) | Conversion math and UI events |
| [AGENTS.md](AGENTS.md) | Notes for Cursor Cloud agents (not required to run the app) |

There is no `package.json`, lockfile, or build output.

## How conversion works

The international mile is defined as **exactly 1.609344 kilometers**. That constant lives in `unit-converter.js`:

```js
const KM_PER_MI = 1.609344;
const MI_PER_KM = 1 / KM_PER_MI; // ≈ 0.621371192237334
```

- km → mi: `miles = kilometers × MI_PER_KM`
- mi → km: `kilometers = miles × KM_PER_MI`

Displayed values are rounded to **nine decimal places**, then trailing zeros are stripped (`parseFloat(n.toFixed(9)).toString()`).

**Example:** 10 km → `6.213711922` mi.

The on-page table and how-to section use the same factor, written as `1 km = 0.6213711922 mi, mi(Int)` and `1 mi, mi(Int) = 1.609344 km`. The how-to example is 15 km → `9.3205678836` mi.

## Using the page

1. Enter a number in **From** (default: kilometer). **To** and the result line update immediately.
2. Enter a number in **To** to convert in the other direction. The last field you typed is remembered as the source.
3. Click the swap control to exchange units and values. Conversion continues from the new source field.
4. **Convert** runs the same math again from the last source (useful after swap or if you want an explicit refresh).
5. **Clear** resets both inputs, the result, and the remembered source.

Non-numeric or empty input clears the opposite field and the result line.

## Branding

Fonts (loaded from Google Fonts in the HTML):

- **Anton** — page title
- **Oswald** — section headings and unit labels
- **Barlow** — body copy, inputs, and buttons

Color tokens in `unit-converter.css`:

| Token | Hex | Typical use |
| --- | --- | --- |
| `--cream` | `#F5EEE4` | Page background |
| `--blue` | `#5D79C9` | Title, swap control, result emphasis |
| `--coral` | `#EE8F6E` | Converter card and table header |
| `--chartreuse` | `#D7DC4E` | Convert / Clear buttons |
| `--navy` | `#1B2233` | Text and borders |
| `--white` | `#FFFFFF` | Inputs and table cells |

The layout is a single column, `max-width: 480px`.

## Development

- Edit HTML, CSS, or JS and reload the browser. There is no hot reload.
- No package manager, lint config, test suite, or production build.
- Keep the reference block to the **conversion table** and **how to convert**—do not add extra sections (definitions, popular conversions, other units) unless that is requested.

Cursor Cloud-specific environment notes live in [AGENTS.md](AGENTS.md).
