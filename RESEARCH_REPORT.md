# RESEARCH_REPORT.md

## Project: selenium_webdriver

**Type:** Browser automation / scraping utility
**Tech Stack:** Node.js 18+, selenium-webdriver 4.x, ChromeDriver, webdriver-manager, Prettier
**Status:** Consolidation target (patterns extracted → rhixecompany-comics)

---

## Similar Projects

| Project | URL | Why Relevant |
|---------|-----|--------------|
| Selenium Scraping Examples | <https://github.com/HasData/selenium-scraping> | Driver setup, waits, proxies, Grid |
| Puppeteer Extra Stealth | <https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth> | Stealth evasion alternative |
| Selenium Node.js guide | <https://scrape.do/blog/selenium-nodejs> | Node.js Selenium scraping |

---

## Key Findings

### Selenium 4 Detection & Stealth (2026)
- Detection vectors: `navigator.webdriver`, UA inconsistencies, behavior patterns
- Override `navigator.webdriver` via CDP: `Page.addScriptToEvaluateOnNewDocument`
- **Playwright is harder to detect and 2-3× faster** — recommended for new scrapers
- Headless mode increasingly detected; use `headless: "new"` for better stealth

### Selenium Manager (Zero-Config)
- **Selenium Manager (4.6+)** replaces `webdriver-manager` — built-in, zero-config, written in Rust
- Auto-detects browser version, resolves correct driver, downloads from Chrome for Testing
- Cache at `~/.cache/selenium` (Linux/macOS) or `%USERPROFILE%\\.cache\\selenium` (Windows)
- **Migration**: Remove WebDriverManager dependency and all `.setup()` calls
- Offline mode: `SE_OFFLINE=true` + pre-warmed cache

### Node.js + ES Modules Setup
- ES modules: `"type": "module"` in package.json; explicit `.js` extensions required
- Selenium 4 W3C standard: relative locators, new window/tab APIs, CDP integration
- Node.js >= 20 required for latest selenium-webdriver

---

## Cheatsheets & Quick Reference

| Topic | Resource | Type |
|-------|----------|------|
| Selenium 4 Manager | <https://www.selenium.dev/documentation/webdriver/drivers/manager> | Guide |
| Puppeteer Extra Stealth | <https://github.com/berstend/puppeteer-extra> | Stealth plugin |

---

## Best Practices

1. **Selenium Manager** — zero-config driver management; remove `webdriver-manager`
2. **Playwright for new scrapers** — 2-3× faster, harder to detect, multi-browser
3. **CDP override** — patch `navigator.webdriver` for stealth
4. **Explicit waits** — `WebDriverWait` with expected conditions, not fixed sleeps
5. **ES modules** — `"type": "module"` for modern Node.js compatibility

---

## Common Pitfalls

| Pitfall | Impact | Avoidance |
|---------|--------|-----------|
| Selenium detection | Site blocks | CDP override + Playwright migration |
| Driver version mismatch | Runtime errors | Selenium Manager auto-resolution |
| Fixed sleep waits | Flaky, slow tests | `WebDriverWait` with expected conditions |
| webdriver-manager dependency | Deprecated pattern | Selenium Manager (built-in since 4.6) |

---

## Performance

1. **Playwright over Selenium** — 2-3× faster for same tasks
2. **Headless "new" mode** — better stealth, comparable performance to old headless
3. **Selenium Grid** — distributed scraping across multiple nodes
4. **Connection reuse** — single driver session for batch operations
5. **Chrome for Testing** — pinned versions for reproducible CI

---

## Security

1. **Never hardcode credentials** — environment variables for all secrets
2. **Proxy rotation** — avoid IP-based blocking for large-scale scraping
3. **Respect robots.txt** — legal compliance for web scraping
4. **Rate limiting** — `page.setDefaultTimeout` and request delays
5. **Session isolation** — separate browser contexts per target site

---

## Related Projects (in workspace)

- **Django-Scrapy-Selenium** — shared scraping patterns; Python alternative
- **rhixecompany-comics** — consolidation target; inherits browser automation patterns

---

## Resources

| Resource | URL | Description |
|----------|-----|-------------|
| Selenium 4 Docs | <https://www.selenium.dev/documentation> | Browser automation |
| Playwright | <https://playwright.dev> | Modern browser automation |
| Scrapy + Playwright | <https://scrapy-plugins.github.io/scrapy-playwright> | Scrapy integration |

### Research Methodology
- **Web search:** web_search (2026 Selenium detection patterns)
- **Documentation:** web_extract (Selenium Manager, Playwright docs)
- **Tool comparison:** Selenium vs Playwright vs Puppeteer benchmarks
- **Last verified:** 2026-07-16
