# REPOSITORY_SUMMARY.md

# Selenium WebDriver — Browser Automation Tool

**Generated:** 2026-07-25  
**Project:** `projects/selenium_webdriver/`  
**Type:** Node.js Selenium Scraper  
**Status:** Active (Tool)

---

## Architecture

| Property    | Value                                    |
| ----------- | ---------------------------------------- |
| **Type**    | Standalone Node.js scraper               |
| **Pattern** | Script-based, explicit waits, ES Modules |
| **Runtime** | Node.js 18+                              |
| **Library** | `selenium-webdriver` 4.x + ChromeDriver  |

---

## Project Structure

```
selenium_webdriver/
├── src/
│   └── scrape.js          # Main scraper entry point
├── package.json           # Dependencies + scripts
├── .gitignore             # Minimal (node_modules, .env, .DS_Store)
└── comics.json            # Output (generated)
```

---

## Technology Stack

| Layer         | Technology                  |
| ------------- | --------------------------- |
| Runtime       | Node.js 18+                 |
| Automation    | selenium-webdriver 4.34.0   |
| Browser       | ChromeDriver (auto-managed) |
| Formatting    | Prettier (2-space)          |
| Module System | ES Modules (`type: module`) |

---

## Key Conventions

- **Explicit waits only** — `WebDriverWait` with expected conditions, never `sleep()`
- **Retry logic** — `StaleElementReferenceException` handled with retry
- **Selector strategy** — Prefer `By.css`, fallback to `By.xpath`
- **Cleanup** — `driver.quit()` in `finally` block
- **No build step** — Direct execution via `node src/scrape.js`

---

## Commands

```bash
npm install
npm test               # Runs scrape.js
node src/scrape.js     # Manual invocation
npm run format         # Prettier write
npm run format:check   # Prettier check
```

---

## Consolidation Target

**P1:** Merge into `rhixecompany-comics/backend/apps/scrapers/selenium_utils.py`

| Current            | Target            |
| ------------------ | ----------------- |
| Node.js + Selenium | Python + Selenium |
| ES Modules         | Standard Python   |
| Manual execution   | Celery task       |
| Output to JSON     | Django ORM upsert |

---

## CI/CD

**Workflow:** `.github/workflows/selenium-webdriver-ci.yml`  
**Triggers:** Push/PR to `development`/`production` touching `projects/selenium_webdriver/**`  
**Jobs:** Install → TypeScript check → Prettier format check → Test

---

## Dependencies

| Package                     | Version | Purpose                |
| --------------------------- | ------- | ---------------------- |
| selenium-webdriver          | 4.34.0  | Browser automation     |
| prettier                    | ^3.6.2  | Formatting             |
| prettier-plugin-tailwindcss | ^0.6.14 | Tailwind class sorting |
| pretty-quick                | ^4.2.2  | Pre-commit formatting  |

---

## Notes

- No CI/CD pipeline originally — added via repo-management
- Standalone tool, no deployment
- `robots.txt` compliance + polite delays required
- ChromeDriver not committed (auto-downloaded)
