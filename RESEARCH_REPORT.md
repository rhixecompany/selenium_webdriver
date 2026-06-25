# RESEARCH_REPORT.md

<!-- Template version: 1.0.0 — size gate: 1KB-5KB -->

## Project: selenium_webdriver
**Type:** Browser automation / scraping utility
**Tech Stack:** Node.js 18+, selenium-webdriver 4.x, ChromeDriver, Prettier
**Status:** Consolidation target (patterns extracted → rhixecompany-comics)

---

## Similar Projects

| Project | URL | Why Relevant |
|---------|-----|--------------|
| Django-Scrapy-Selenium | `projects/Django-Scrapy-Selenium` | Shared browser automation concerns. |
| rhixecompany-comics | `projects/rhixecompany-comics` | Consolidation target consuming scraping utilities. |
| Python-projects | `projects/Python-projects` | Python Selenium + scraping patterns. |

---

## Key Findings

### Selenium 4 Modernization (Node.js, 2026)
- **Selenium Manager built-in** — auto driver management; `new Builder().forBrowser('chrome').build()` works out of box [Selenium docs]
- **Selenium 4.x** — W3C WebDriver standard; relative locators, new window/tab APIs [Selenium docs]
- **ES Modules required** — `"type": "module"` in package.json; explicit file extensions mandatory [jsmanifest 2026]
- **Playwright alternative** — faster, auto-wait, stealth plugins; migration path for new scrapers [Selenium Alternatives 2026]

### Stale Element Reference Exception (2026)
- **Root cause**: DOM re-render after element location — reference out of sync [Testleaf 2026]
- **Best fix**: Store `By` locators (not WebElements); re-find just-in-time [Testleaf 2026]
- **Retry pattern**: catch `StaleElementReferenceException` only, retry 1-2x [Testleaf 2026]
- **CI amplification**: timing differences make staleness more common; use stable waits [Testleaf 2026]

### ChromeDriver Anti-Detection (2026)
- **Detection vectors**: `navigator.webdriver`, headless UA, canvas fingerprint [ScrapFly 2026]
- **Undetected ChromeDriver** — renames detection variables, randomizes UA, adds delays; bypasses Cloudflare/Imperva [ScrapFly 2026]
- **nodriver** (direct CDP) shows 28/31 bypass rate vs 0/31 for standard Selenium [Anti-detect benchmark 2026]

### robots.txt & Polite Scraping
- Ignoring `robots.txt` risks blocking and legal issues; honor `Crawl-Delay` [DZone, ScrapingBee 2026]
- Parse robots.txt before each session; pair rate limiting with proxies [ScrapingBee 2026]

---

## Cheatsheets & Quick Reference

| Topic | Resource | Type |
|-------|----------|------|
| Selenium JS docs | https://www.selenium.dev/documentation | Official docs |
| Selenium waits | https://www.selenium.dev/documentation/webdriver/waits | Official guide |
| Stale element fix | https://www.testleaf.com/blog/the-untold-story-stale-element-reference-exception-in-selenium | Guide |
| Undetected ChromeDriver | https://scrapfly.io/blog/posts/web-scraping-without-blocking-using-undetected-chromedriver | Guide |

---

## Best Practices

1. **Selenium Manager for drivers** — zero-config driver management; no manual ChromeDriver setup
2. **Explicit waits everywhere** — `driver.wait(until.elementLocated(...), 10000)`; never `sleep()`
3. **Centralized retry utils** — `safeClick`, `safeGetText` with 3x stale element retry
4. **Store locators, not elements** — cache `By` selectors; re-find just-in-time
5. **Honor robots.txt** — parse before session; 2s+ polite delays between requests

---

## Common Pitfalls

| Pitfall | Impact | Avoidance |
|---------|--------|-----------|
| Hardcoded URLs | Fragile scraper | Load from config/env (`process.env.TARGET_URL`) |
| Cached WebElements | StaleElementReferenceException | Store `By` locators, re-find just-in-time |
| No try/finally quit | Zombie Chrome processes | Always `driver.quit()` in `finally` |

---

## Performance

1. **Session reuse** — single browser session for batch scrape; avoids 3-5s startup per run
2. **Headless opt** — `--disable-dev-shm-usage`, `--disable-extensions`, `--disable-images`

---

## Security

1. **Never commit ChromeDriver binaries** — Selenium Manager handles; `.gitignore chromedriver*`
2. **Respect robots.txt** — `Crawl-Delay` + 2s+ polite delays
3. **Proxy rotation** — avoid IP-based rate limiting for production scrapers

---

## Related Projects (in workspace)

- **Django-Scrapy-Selenium** — shared Selenium + Celery automation concerns
- **rhixecompany-comics** — target where scraping utilities should migrate
- **Python-projects** — Python Selenium + scraping patterns

---

## Resources

| Resource | URL | Description |
|----------|-----|-------------|
| Selenium docs | https://www.selenium.dev/documentation | Browser automation docs |
| Selenium waits | https://www.selenium.dev/documentation/webdriver/waits | Explicit/implicit wait patterns |
| Node.js best practices | https://github.com/goldbergyoni/nodebestpractices | Node.js best practices 2026 |
| Undetected ChromeDriver | https://github.com/ultrafunkamsterdam/undetected-chromedriver | Stealth Selenium driver |
