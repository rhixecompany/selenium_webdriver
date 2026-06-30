# RESEARCH_REPORT.md

## Project: selenium_webdriver

**Type:** Browser automation / scraping utility
**Tech Stack:** Node.js 18+, selenium-webdriver 4.x, ChromeDriver, webdriver-manager, Prettier
**Status:** Consolidation target (patterns extracted → rhixecompany-comics)

---

## Similar Projects

| Project | URL | Why Relevant |
|---------|-----|--------------|
| Selenium Scraping Examples | https://github.com/HasData/selenium-scraping | driver setup, waits, proxies, Grid |
| Puppeteer Extra Stealth | https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth | stealth evasion alternative |
| Headless Browsers List | https://github.com/dhamaniasad/HeadlessBrowsers | comparison of all headless browsers |
| Selenium Node.js guide | https://scrape.do/blog/selenium-nodejs | Node.js Selenium scraping |

---

## Key Findings

### Selenium 4 Detection (2026)
- Detection vectors: `navigator.webdriver`, UA inconsistencies, behavior
- `navigator.webdriver = true` detectable — override via CDP: `Page.addScriptToEvaluateOnNewDocument`
- Headless mode increasingly detected; use `headless: "new"` for better stealth
- Playwright is harder to detect and 2-3x faster; evaluate migration for new scrapers

### Node.js Selenium Setup
- `selenium-webdriver` NPM package; ChromeDriver must match Chrome version exactly
- `webdriver-manager` for automatic driver management (avoid version mismatch)
- ES modules: `"type": "module"` in package.json; explicit `.js` extensions required
- Selenium 4 W3C standard: relative locators, new window/tab APIs, CDP integration

### Anti-Detection Techniques
- Custom user-agent, disable `navigator.webdriver` override
- Real viewport sizes; random mouse movements
- Proxy rotation: BrightData, IPRoyal, Oxylabs for large-scale scraping

### WebDriverWait Best Practices
- Explicit waits only: `driver.wait(until.elementLocated(By.css('.foo')), 10000)`
- Never use `sleep()` — use expected conditions
- Store `By` locators (not WebElements); re-find just-in-time to avoid StaleElementReference
- Retry pattern: catch `StaleElementReferenceException` only, retry 1-2x

---

## Cheatsheets & Quick Reference

| Topic | Resource | Type |
|-------|----------|------|
| Selenium JS docs | https://www.selenium.dev/documentation | Official docs |
| Selenium waits | https://www.selenium.dev/documentation/webdriver/waits | Official guide |
| Selenium Node.js guide | https://scrape.do/blog/selenium-nodejs | Tutorial |
| Headless browsers | https://github.com/dhamaniasad/HeadlessBrowsers | Comparison |

---

## Best Practices

1. **Explicit waits everywhere** — `WebDriverWait` with expected conditions; never `sleep()`
2. **Store locators, not elements** — cache `By` selectors; re-find just-in-time
3. **`driver.quit()` in `finally`** — always cleanup; prevent zombie Chrome processes
4. **Use `webdriver-manager`** — avoid ChromeDriver version mismatch
5. **Honor robots.txt** — parse before session; 2s+ polite delays between requests

---

## Common Pitfalls

| Pitfall | Impact | Avoidance |
|---------|--------|-----------|
| ChromeDriver version mismatch | scraper breaks | use `webdriver-manager` |
| `navigator.webdriver = true` | anti-bot detection | override via CDP |
| Headless mode detection | blocking | use `headless: "new"` |
| No `await` on async ops | race conditions | always await; no implicit promise handling |
| Memory leaks | zombie Chrome | `driver.quit()` in `finally` |

---

## Performance

1. **Selenium Grid** — parallel scraping across multiple machines
2. **`page_load_strategy: 'eager'`** — don't wait for full page load
3. **Session reuse** — single browser session for batch scrape
4. **Headless flags** — `--disable-dev-shm-usage`, `--disable-extensions`, `--disable-images`

---

## Security

1. **Never commit ChromeDriver** — `webdriver-manager` handles; `.gitignore chromedriver*`
2. **Respect robots.txt** — `Crawl-Delay` + 2s+ polite delays
3. **Proxy rotation** — residential proxies for production scrapers
4. **rate limiting** — random delays 1-5s; avoid aggressive concurrent requests
5. **Legal compliance** — check ToS; don't bypass auth or scrape copyrighted content

---

## Related Projects (in workspace)

- **Python-projects** — browser automation patterns
- **Django-Scrapy-Selenium** — shared Selenium + Celery automation concerns
- **rhixecompany-comics** — target where scraping utilities should migrate

---

## Resources

| Resource | URL | Description |
|----------|-----|-------------|
| Selenium docs | https://www.selenium.dev/documentation | Browser automation docs |
| Selenium waits | https://www.selenium.dev/documentation/webdriver/waits | Wait patterns |
| Node.js best practices | https://github.com/goldbergyoni/nodebestpractices | Node.js best practices |
| Puppeteer Stealth | https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth | stealth evasion |