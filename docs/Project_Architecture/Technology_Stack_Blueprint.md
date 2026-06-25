# Technology Stack Blueprint

## Project: selenium_webdriver — Chrome Scraper

> **Generated:** 2026-06-25  
> **Generator:** technology-stack-blueprint-generator  
> **Analysis Depth:** Comprehensive

---

## Overview

A Node.js Selenium-based web scraper targeting comics/manga sites. Uses Selenium WebDriver 4.x with ChromeDriver for dynamic content scraping. ES modules throughout.

**Project Type:** CLI Scraper Tool  
**Stack Type:** Node.js

---

## Technology Stack

### Languages & Runtimes

| Technology | Version | Usage |
|---|---|---|
| JavaScript (ES Modules) | — | Primary language |
| Node.js | ^18+ | JavaScript runtime |
| npm | — | Package manager |

### Dependencies

| Dependency | Version | Purpose |
|---|---|---|
| selenium-webdriver | 4.34.0 | Browser automation |
| assert | 2.1.0 | Testing assertions |

### Dev Dependencies

| Dependency | Version | Purpose |
|---|---|---|
| prettier | ^3.6.2 | Code formatting |

---

## Licensing

| Component | License |
|---|---|
| selenium_webdriver | (not specified) |

---

## Key Scripts

| Script | Description |
|---|---|
| `npm test` | Run scraper (`node src/scrape.js`) |
| `npm run format` | Prettier formatting |
| `npm run format:check` | Format checking |

---

## Coding Conventions

- **ES Modules**: `"type": "module"` in package.json
- **Explicit WebDriverWait**: No sleep-based waiting
- **StaleElementReferenceException retry**: Robust element handling
- **Consistent `By` selectors**: Standardized selectors
- **`driver.quit()` in `finally`**: Proper cleanup
- **Prettier**: 2-space indentation
- **`robots.txt`**: Respect with polite delays

---

## Architecture

```
selenium_webdriver/
├── src/
│   └── scrape.js          # Main scraper
├── package.json
└── AGENTS.md
```

---

## Patterns

| Pattern | Implementation |
|---|---|
| Wait Strategy | `WebDriverWait` with explicit conditions |
| Error Handling | Retry on `StaleElementReferenceException` |
| Selectors | Consistent `By` (CSS/XPath) |
| Cleanup | `driver.quit()` in `finally` block |
| Politeness | Respect `robots.txt`, configurable delays |

---

## Notes

- No build step required
- No deployment configuration
- ChromeDriver not stored in VCS
- Manual testing via `node src/scrape.js`
