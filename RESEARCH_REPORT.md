# RESEARCH_REPORT.md

## Project: selenium_webdriver

**Type:** Browser automation / Node.js scraping utility (comics/manga)
**Tech Stack:** Node.js 18+, selenium-webdriver 4.x, ChromeDriver via Selenium Manager, ES Modules
**Research Date:** 2026-07-16

---

## Similar Projects & References

Key references: [Selenium Scraping Examples](https://github.com/HasData/selenium-scraping), [Selenium Node.js Guide](https://scrape.do/blog/selenium-nodejs), [Playwright](https://playwright.dev) (2-3× faster), [Selenium Grid](https://www.selenium.dev/documentation/grid/), [WebDriver BiDi](https://www.selenium.dev/documentation/webdriver/bidi).

---

## Key Findings

**Selenium 4 is the mainstream default in 2026.** Selenium 4.x stable leads adoption; teams selectively pilot **Selenium 5** previews for richer BiDi. 4.x brings W3C WebDriver, Grid 4 scalability, improved driver management. (Source: 2026 Selenium version analysis.)

**WebDriver BiDi is now the official CDP replacement** (verified at selenium.dev/docs/webdriver/bidi). W3C-standard bidirectional protocol: subscribe to live browser events — network requests, console messages, log entries, new contexts — across Chrome, Edge, Firefox (Safari aligning). CDP is "temporary until BiDi is implemented." Enable via `options.setCapability('webSocketUrl', true)` (JS) / `options.enable_bidi = True` (Python). New code should target BiDi: console capture, JS error listening, network interception, request mocking, basic auth.

**Selenium Manager (zero-config)** — replaces `webdriver-manager` (4.6+). Auto-detects browser, resolves matching driver, downloads from Chrome for Testing. No `.setup()` calls. Rust-based. Offline via `SE_OFFLINE=true`. Migration: remove webdriver-manager; `new Builder().forBrowser('chrome').build()` works automatically.

**Headless mode** — `headless()` removed in 4.10.0. Chrome 109+ supports `--headless=new` (full browser, stealthier) vs legacy `--headless` (minimal). Set `options.addArguments('--headless=new')`.

**Detection & stealth (2026)** — vectors: `navigator.webdriver`, plugin counts, UA/language mismatches, missing `chrome.runtime`, behaviour. Mitigations: BiDi/CDP override of `navigator.webdriver`, `--headless=new`, rotate UAs, realistic 500–1500ms delays. **Playwright recommended** for new scrapers — harder to detect, 2–3× faster.

---

## Best Practices
1. **Explicit waits** — `WebDriverWait` with `until.elementLocated()` / `until.elementIsVisible()`, never fixed `sleep()`
2. **Resource blocking** — block images/CSS/fonts via BiDi/CDP network interception for speed
3. **Cleanup** — always `driver.quit()` in `finally` block
4. **StaleElement retry** — re-query element + retry 3× with 500ms delay
5. **Page Object Model** — organise selectors into page classes
6. **Concurrency throttle** — use `p-limit` to cap parallel browser sessions

---

## Common Pitfalls

| Pitfall | Solution |
|---------|----------|
| StaleElementReferenceException | Re-query + retry loop (3 attempts) |
| Selenium detection | BiDi/CDP override or migrate to Playwright |
| Driver version mismatch | Selenium Manager auto-fixes |
| Fixed `sleep()` | WebDriverWait + expected conditions |
| No `driver.quit()` | try/finally cleanup |
| webdriver-manager dep | Remove; Selenium Manager since 4.6 |

---

## Performance Tips
1. **Playwright** — 2-3× faster; consider migrating new scrapers
2. **Block resources** — intercept images/CSS/fonts for major speedup
3. **Connection reuse** — single session for batch operations
4. **Selenium Grid** — `java -jar selenium-server-4.x.x.jar standalone` for distributed scraping
5. **Chrome for Testing** — pinned versions for reproducible builds
6. **Low implicit wait** (~2s) — lean on explicit waits instead

---

## Security
1. **Environment variables** for all secrets — never hardcode
2. **Proxy rotation** via `--proxy-server` for large-scale scraping
3. **Respect robots.txt** — legal compliance
4. **Rate limiting** — polite 2s+ delays, throttle concurrency
5. **BiDi event subscriptions** — prefer cross-browser BiDi over Chrome-only CDP

---

## Related Projects

| Project | Relevance |
|---------|-----------|
| rhixecompany-comics | Selenium used in its Scrapy scraping pipeline |
| Python-projects | Standalone script + uv dependency patterns |
| playwright (alt) | Faster, stealthier successor to evaluate |

---

## Resources

| Resource | URL |
|----------|-----|
| WebDriver BiDi docs | https://www.selenium.dev/documentation/webdriver/bidi |
| Selenium Grid | https://www.selenium.dev/documentation/grid/ |
| Selenium Node.js Guide | https://scrape.do/blog/selenium-nodejs |
| Playwright | https://playwright.dev |
| Selenium Scraping Examples | https://github.com/HasData/selenium-scraping |

**Methodology:** 8 web searches (Selenium 4/5 2026, BiDi, Selenium Manager, headless, detection) + selenium.dev BiDi doc extraction. BiDi/Manager claims verified (2026-07-16).
