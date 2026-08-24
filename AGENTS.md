# km-mile-unit-converter

## Cursor Cloud specific instructions

This repository is a static km/mile unit converter split across three files:
`unit-converter.html` (markup), `unit-converter.css` (styles), and
`unit-converter.js` (logic). There is no package manager, build step, dependency
manifest, lint config, or automated test suite.

- Run/develop: serve the repo root with any static file server and open the page.
  For example `python3 -m http.server 8000` (Python 3 is preinstalled), then visit
  `http://localhost:8000/unit-converter.html`. Editing a file and reloading the
  browser is the full dev loop; there is no hot reload. CSS and JS must be served
  over HTTP (not opened as a `file://` page) so the stylesheet and script load.
- No dependencies to install, so environment startup requires no install step.
- Lint/test/build: none exist. Do not invent or add tooling unless explicitly asked.
- Conversion logic lives in `unit-converter.js`; the constant
  `KM_PER_MI = 1.609344` drives conversion.
- Production hosting is GitHub Pages from branch `main` (root). Live URL:
  `https://ariletice.github.io/KM-Mile-Unit-Converter/`. Do not add a custom
  Pages Actions workflow; `GITHUB_TOKEN` cannot create the Pages site, and
  those runs show up as failed deployments.
