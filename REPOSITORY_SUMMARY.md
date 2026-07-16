# Repository Summary — `selenium_webdriver`

> Generated from real local git history on 2026-07-16. All facts are evidence-based
> (commit hashes, dates, file names) and were not invented.

## Overview

`selenium_webdriver` is a **Node.js Selenium WebDriver scraper** for comics/manga, owned by
**rhixecompany**. It automates Chrome to extract data from websites and emit JSON. It is a
sibling of the other four repos and is explicitly referenced by `rhixecompany-comics` as the
source of its Selenium automation patterns. The working tree is small and focused: `src/`
with 5 JS files, `package.json` (ES Modules, `selenium-webdriver` 4.34.0), `bun.lock`, and
the usual generated guides plus `RESEARCH_REPORT.md` and `web-research-selenium-webdriver.md` (27 KB).

## Architecture

- **Type:** Node.js 18+ script-based Selenium scraper (no framework, no build step).
- **Module system:** ES Modules (`"type": "module"`).
- **Browser:** Chrome via `selenium-webdriver` 4.x + ChromeDriver.
- **Key patterns (from `ARCHITECTURE.md`):**
  1. Explicit `WebDriverWait` with expected conditions — never `sleep()`.
  2. Retry logic on `StaleElementReferenceException`.
  3. Consistent `By` selector strategy (`By.css` / `By.xpath`).
  4. `driver.quit()` in `finally` block to ensure cleanup.
- **Output:** JSON data files (portable).
- **Politeness:** `robots.txt` compliance + polite delays between requests.

## Key Components

| Path | Role |
|------|------|
| `src/scrape.js` | Primary scraper (also the `npm test` entry) |
| `src/scrape2.js` | Secondary/alternate scraper |
| `src/test.js` | Test/validation script |
| `src/test1.js` | Test/validation script |
| `src/utils.js` | Shared scraping utilities |
| `package.json` | Deps: `selenium-webdriver` 4.34.0, `assert`; scripts: test/format |
| `bun.lock` | Lockfile |
| `.prettierrc` / `.editorconfig` / `.eslintignore` / `.prettierignore` / `.dockerignore` | Format/lint config |
| `API_REFERENCE.md`, `ARCHITECTURE.md`, `technology-stack.md`, `folder-structure.md` | Generated guides |
| `copilot-instructions.md`, `code-exemplars.md`, `cross-linking-report.md`, `execution-summary.md`, `validation-report.md`, `project-workflow.md`, `SECURITY.md`, `SETUP_GUIDE.md`, `DEVELOPMENT_GUIDE.md`, `TESTING_GUIDE.md`, `DEPLOYMENT_GUIDE.md` | Generated docs |
| `RESEARCH_REPORT.md` / `web-research-selenium-webdriver.md` | Research dossiers |

## Technologies

- **Runtime:** Node.js 18+
- **Library:** `selenium-webdriver` 4.x + ChromeDriver
- **Formatting:** Prettier (2-space indent), prettier-plugin-tailwindcss, pretty-quick
- **Module system:** ES Modules
- **Testing:** manual via `node src/scrape.js` (`npm test` runs scrape.js)
- **Tooling:** ruff/mypy conventions referenced across siblings; VS Code (`.vscode/`, `.github/`)

## Data Flow

```
Target Website → Chrome Browser (automated) → DOM Parsing (WebDriverWait + By selectors) → JSON Data Files
```

## Team

| Contributor | Commits | Role |
|-------------|---------|------|
| `rhixecompany` <rhixecompany@gmail.com> | 5 / 5 (100%) | Sole author — setup, config, docs, research reports |

**Bus factor:** 1. All 5 commits were authored by a single contributor;
no co-authors, merges, or external PRs.
