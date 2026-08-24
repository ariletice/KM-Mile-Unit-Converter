# km-mile-unit-converter

## Cursor Cloud specific instructions

This repository is a single static web page, `unit-converter.html`: a km/mile unit
converter with inline CSS and vanilla JavaScript. There is no package manager,
build step, dependency manifest, lint config, or automated test suite.

- Run/develop: serve the repo root with any static file server and open the page.
  For example `python3 -m http.server 8000` (Python 3 is preinstalled), then visit
  `http://localhost:8000/unit-converter.html`. Editing the file and reloading the
  browser is the full dev loop; there is no hot reload.
- No dependencies to install, so environment startup requires no install step.
- Lint/test/build: none exist. Do not invent or add tooling unless explicitly asked.
- The converter logic lives entirely in the inline `<script>` at the bottom of
  `unit-converter.html`; the constant `KM_PER_MI = 1.609344` drives conversion.
