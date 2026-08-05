# RESEARCH_REPORT.md

## Project: selenium_webdriver

**Type:** Browser automation / scraping utility
**Tech Stack:** Node.js 18+, selenium-webdriver 4.x, ChromeDriver, webdriver-manager, Prettier
**Status:** Consolidation target (patterns extracted → rhixecompany-comics)

---

## Similar Projects

| Project                    | URL                                            | Why Relevant                       |
| -------------------------- | ---------------------------------------------- | ---------------------------------- |
| Selenium Scraping Examples | <https://github.com/HasData/selenium-scraping> | Driver setup, waits, proxies, Grid |
| Puppeteer Extra Stealth    | <https://github.com/berstend/puppeteer-extra>  | Stealth evasion alternative        |

---

## Key Findings

### Selenium vs Playwright (2026 Comparison)

- **Playwright** is 2-3× faster, harder to detect, multi-browser (Chromium + Firefox + WebKit)
- Selenium supports wider browser/browser-version range (including legacy)
- Playwright's architecture (direct browser protocol) vs Selenium (WebDriver HTTP) — Playwright wins on speed, reliability
- **Recommendation for new scrapers:** Playwright; Selenium for enterprise/legacy compatibility

### Selenium Manager (Zero-Config, 4.6+)

- Built-in Selenium Manager replaces `webdriver-manager` — written in Rust, auto-detects browser version
- Cache at `~/.cache/selenium` (Linux/macOS) or `%USERPROFILE%\.cache\selenium` (Windows)
- **Migration:** Remove WebDriverManager dependency and `.setup()` calls

### Detection & Stealth

- Detection vectors: `navigator.webdriver`, UA inconsistencies, behavior patterns
- Override via CDP: `Page.addScriptToEvaluateOnNewDocument`
- Headless mode increasingly detected; use `headless: "new"` for better stealth

### WebDriver BiDi (2026 Standard)

- Selenium 4 moving toward bidirectional protocol to match Playwright's capabilities
- Still maturing; Playwright's auto-waiting gives better DX today

---

## Cheatsheets & Quick Reference

| Topic                  | Resource                                                           | Type       |
| ---------------------- | ------------------------------------------------------------------ | ---------- |
| Selenium 4 Manager     | <https://www.selenium.dev/documentation/webdriver/drivers/manager> | Guide      |
| Selenium vs Playwright | <https://www.browserstack.com/guide/playwright-vs-selenium>        | Comparison |
| WebDriver BiDi         | <https://www.selenium.dev/documentation/webdriver/bidirectional>   | Spec       |

---

## Best Practices

1. **Selenium Manager** — zero-config driver management; remove `webdriver-manager`
2. **Playwright for new scrapers** — 2-3× faster, harder to detect, multi-browser
3. **CDP override** — patch `navigator.webdriver` for stealth
4. **Explicit waits** — `WebDriverWait` with expected conditions, not fixed sleeps
5. **ES modules** — `"type": "module"` for modern Node.js compatibility

---

## Common Pitfalls

| Pitfall                      | Impact             | Avoidance                                |
| ---------------------------- | ------------------ | ---------------------------------------- |
| Selenium detection           | Site blocks        | CDP override + Playwright migration      |
| Driver version mismatch      | Runtime errors     | Selenium Manager auto-resolution         |
| Fixed sleep waits            | Flaky, slow tests  | `WebDriverWait` with expected conditions |
| webdriver-manager dependency | Deprecated pattern | Selenium Manager (built-in since 4.6)    |

---

## Performance

1. **Playwright over Selenium** — 2-3× faster for same tasks
2. **WebDriver BiDi** — improving cross-browser performance in Selenium 4.x
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

| Resource            | URL                                                                       | Description               |
| ------------------- | ------------------------------------------------------------------------- | ------------------------- |
| Selenium 4 Docs     | <https://www.selenium.dev/documentation>                                  | Browser automation        |
| Playwright          | <https://playwright.dev>                                                  | Modern browser automation |
| Stack Overflow 2026 | <https://stackoverflow.blog/2026/06/15/selenium-vs-cypress-vs-playwright> | Automation comparison     |

### Research Methodology

- **Web search:** web_search (2026 Selenium vs Playwright, BrowserStack, Katalon comparisons)
- **Documentation:** web_extract (Selenium Manager, WebDriver BiDi docs)
- **Last verified:** 2026-07-28
