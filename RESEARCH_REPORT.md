# RESEARCH_REPORT.md

## Project: selenium_webdriver

**Type:** Browser automation / scraping utility
**Tech Stack:** Node.js 18+, selenium-webdriver 4.x, ChromeDriver, webdriver-manager, Prettier
**Status:** Consolidation target (patterns extracted → rhixecompany-comics)

---

## Similar Projects

| Project | URL | Why Relevant |
|---------|-----|--------------|
| Selenium Scraping Examples | <https://github.com/HasData/selenium-scraping> | driver setup, waits, proxies, Grid |
| Puppeteer Extra Stealth | <https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth> | stealth evasion alternative |
| Headless Browsers List | <https://github.com/dhamaniasad/HeadlessBrowsers> | comparison of all headless browsers |
| Selenium Node.js guide | <https://scrape.do/blog/selenium-nodejs> | Node.js Selenium scraping |

---

## Key Findings (Updated 2026)

### Selenium 4 Detection (2026)

- Detection vectors: `navigator.webdriver`, UA inconsistencies, behavior
- `navigator.webdriver = true` detectable — override via CDP: `Page.addScriptToEvaluateOnNewDocument`
- Headless mode increasingly detected; use `headless: "new"` for better stealth
- **Playwright is harder to detect and 2-3x faster; evaluate migration for new scrapers**

### Node.js Selenium Setup (2026)

- `selenium-webdriver` NPM package; ChromeDriver must match Chrome version exactly
- **Selenium Manager (4.6+)** — built-in, zero-config driver manager written in Rust, bundled inside Selenium bindings. Automatically detects browser version, resolves correct driver, downloads from official endpoints (Chrome for Testing), caches at `~/.cache/selenium` (Linux/macOS) or `%USERPROFILE%\.cache\selenium` (Windows). **Replaces `webdriver-manager`** for most teams.
- ES modules: `"type": "module"` in package.json; explicit `.js` extensions required
- Selenium 4 W3C standard: relative locators, new window/tab APIs, CDP integration
- Node.js >= 20 required for latest selenium-webdriver

### ChromeDriver Management & Version Pinning (2026)

- **Selenium Manager** is now the default — no setup code needed. First run auto-downloads matching driver.
- **Cache**: `~/.cache/selenium` (Linux/macOS) / `%USERPROFILE%\.cache\selenium` (Windows) — shared across projects. Relocate via `SE_CACHE_PATH` env var for CI cache sharing.
- **Offline mode**: Set `SE_OFFLINE=true` + pre-warmed cache (`SE_CACHE_PATH`) for air-gapped CI.
- **Proxy**: Respects `HTTPS_PROXY`/`HTTP_PROXY` env vars; also `--proxy` CLI flag and `SE_HTTP_PROXY`.
- **Pinning**: Force browser version via `options.setBrowserVersion("125")` or CLI `--browser-version 125` — Selenium Manager resolves matching driver + downloads browser via Chrome for Testing if needed.
- **Debug**: `selenium-manager --browser chrome --debug` prints detected browser, resolved driver, download URL, cache hits/misses.
- **Disable telemetry**: `SE_AVOID_STATS=true` for locked-down CI.
- **Migration from WebDriverManager**: Remove dependency and all `WebDriverManager.chromedriver().setup()` calls — no longer needed.

### Selenium vs Playwright vs Puppeteer for Comic Scraping (2026)

| Factor | Selenium | Playwright | Puppeteer |
|--------|----------|------------|-----------|
| **Detection resistance** | Moderate (needs stealth plugins) | High (auto-waits, better fingerprint) | Moderate (CDP-based) |
| **Speed** | Baseline | **2-3x faster** | Fast (Chrome-only) |
| **Cross-browser** | Chrome, Firefox, Safari, Edge | **Chromium, Firefox, WebKit** | Chrome/Firefox only |
| **Languages** | JS, Python, Java, C#, Ruby | **JS/TS, Python, Java, .NET** | JS/TS only |
| **Stealth plugins** | `undetected-chromedriver` (Python), `selenium-stealth` | `playwright-extra` + stealth plugin | `puppeteer-extra-plugin-stealth` |
| **Comic scraping fit** | Legacy codebases, multi-lang teams | **Best for new scrapers** | Quick Chrome-only scripts |
| **CDP access** | Yes (BiDi in Selenium 4) | Native CDP | Native CDP |
| **Auto-waits** | Manual (WebDriverWait) | **Built-in** | Manual |
| **Proxy support** | Manual config | **Built-in context proxies** | Manual |

**Recommendation for comic scraping 2026**: 
- **New projects**: Playwright + `playwright-extra` stealth + residential proxies
- **Existing Selenium codebase**: Add `undetected-chromedriver` (Python) or `selenium-stealth` (Node) + Selenium Manager for driver management
- **Hard targets (Cloudflare, etc.)**: Bright Data Scraping Browser or Apify + residential proxies

### Headless Chrome Scraping Anti-Detection Techniques (2026)

**Layer 1: IP Reputation**
- Residential/ISP proxies (Bright Data, IPRoyal, Oxylabs) — datacenter IPs flagged
- Sticky sessions for logged-in state; rotate per request for stateless

**Layer 2: TLS Fingerprint (JA3/JA4)**
- Selenium uses browser's TLS stack — OK when driving real Chrome
- Avoid raw HTTP clients (`requests`, `axios`, `fetch`) for protected targets

**Layer 3: Browser Fingerprint**
- `navigator.webdriver = true` → override via CDP: `Page.addScriptToEvaluateOnNewDocument({ source: "Object.defineProperty(navigator, 'webdriver', { get: () => undefined })" })`
- Headless leaks: empty `navigator.plugins`, canvas/WebGL differences, missing Chrome runtime
- **Fixes**: `headless: "new"` (Chrome 109+), `--disable-blink-features=AutomationControlled`, stealth plugins
- **Node stealth**: `selenium-stealth` npm package patches common vectors
- **Testing**: `bot.sannysoft.com`, `browserleaks.com` to validate fingerprint

**Layer 4: Behavioral Patterns**
- Random delays (1-5s) between requests; avoid burst patterns
- Human-like mouse movements, scrolling, click coordinates
- Session reuse for batch scraping (single browser session)

**Layer 5: CAPTCHA**
- 2Captcha / Capsolver APIs for DIY
- Bright Data Scraping Browser: auto-solves CAPTCHAs

**Cloudflare Bypass (2026 ranking)**:
1. Bright Data Scraping Browser (managed, high success)
2. Playwright + stealth plugin + residential proxy (medium-high)
3. `undetected-chromedriver` (Selenium, medium)
4. Raw HTTP clients — **does not work**

### Node.js ES Modules + selenium-webdriver Project Structure (2026)

```text
selenium-webdriver/
├── package.json          # "type": "module", "main": "src/index.js"
├── .prettierrc           # 2-space indent, single quotes
├── src/
│   ├── index.js          # entry point
│   ├── config/
│   │   ├── browser.js    # ChromeOptions builder (headless, stealth, proxy)
│   │   └── selectors.js  # By locators as constants
│   ├── utils/
│   │   ├── driver.js     # Builder + Selenium Manager + cleanup
│   │   ├── waits.js      # WebDriverWait wrappers (explicit waits only)
│   │   └── stealth.js    # CDP script injection for anti-detection
│   ├── pages/
│   │   └── comicPage.js  # Page Object pattern
│   └── scrapers/
│       └── comicScraper.js
├── tests/
└── .gitignore            # .cache/selenium/, node_modules/, *.log
```

**Key ES Module patterns**:
- `import { Builder, By, until } from 'selenium-webdriver'`
- `import chrome from 'selenium-webdriver/chrome.js'` (`.js` extension required)
- Dynamic `import()` for optional deps (e.g., stealth plugin)
- Top-level `await` in entry point
- `node:` prefix for built-ins: `import { fileURLToPath } from 'node:url'`

### Selenium Grid vs Local WebDriver for Scraping Scale (2026)

| Factor | Local WebDriver | Selenium Grid / Selenoid |
|--------|-----------------|--------------------------|
| **Setup** | Zero config (Selenium Manager) | Hub + nodes / K8s / Docker |
| **Parallelism** | Limited by CPU/RAM (1 browser ~200-500MB) | Horizontal scale across machines |
| **Maintenance** | None | Infrastructure ops |
| **Best for** | < 5 concurrent, dev/small batches | 10+ concurrent, CI, long-running |
| **Cloud alternatives** | — | Browserless, BrowserStack, Sauce Labs, Bright Data Scraping Browser |
| **Selenoid** | — | Lightweight Go-based Grid alternative; auto-scales browsers in containers |

**Recommendation**: 
- Start local with Selenium Manager + session reuse (single browser, multiple tabs/pages)
- Move to **Browserless** or **Bright Data Scraping Browser** for cloud scale — no Grid infra to manage
- Selenium Grid / Selenoid only if you need on-prem control or have existing Grid investment

---

## Cheatsheets & Quick Reference

| Topic | Resource | Type |
|-------|----------|------|
| Selenium JS docs | <https://www.selenium.dev/documentation> | Official docs |
| Selenium waits | <https://www.selenium.dev/documentation/webdriver/waits> | Official guide |
| Selenium Node.js guide | <https://scrape.do/blog/selenium-nodejs> | Tutorial |
| Headless browsers | <https://github.com/dhamaniasad/HeadlessBrowsers> | Comparison |
| Selenium Manager guide | <https://qaskills.sh/blog/selenium-manager-4-6-driver-management-2026-guide> | 2026 reference |
| Anti-detection 2026 | <https://use-apify.com/blog/web-scraping-anti-detection-2026> | Comprehensive guide |
| Selenium JS API | <https://www.selenium.dev/selenium/docs/api/javascript> | API reference |

---

## Best Practices (Updated 2026)

1. **Explicit waits everywhere** — `driver.wait(until.elementLocated(By.css('.foo')), 10000)`; never `sleep()`
2. **Store locators, not elements** — cache `By` selectors; re-find just-in-time to avoid `StaleElementReferenceException`
3. **`driver.quit()` in `finally`** — always cleanup; prevent zombie Chrome processes
4. **Use Selenium Manager (4.6+)** — avoid ChromeDriver version mismatch; no `webdriver-manager` needed
5. **Honor robots.txt** — parse before session; 2s+ polite delays between requests
6. **Headless stealth** — `headless: "new"`, `--disable-blink-features=AutomationControlled`, CDP script to hide `navigator.webdriver`
7. **Session reuse** — single browser session for batch scrape; navigate between pages
8. **Page load strategy** — `pageLoadStrategy: 'eager'` (don't wait for full load)
9. **Proxy rotation** — residential proxies per session/request for production
10. **Legal compliance** — check ToS; don't bypass auth or scrape copyrighted content

---

## Common Pitfalls (Updated 2026)

| Pitfall | Impact | Avoidance |
|---------|--------|-----------|
| ChromeDriver version mismatch | scraper breaks | **Use Selenium Manager (built-in)** |
| `navigator.webdriver = true` | anti-bot detection | Override via CDP `Page.addScriptToEvaluateOnNewDocument` |
| Headless mode detection | blocking | Use `headless: "new"` + stealth flags |
| No `await` on async ops | race conditions | Always `await`; no implicit promise handling |
| Memory leaks | zombie Chrome | `driver.quit()` in `finally` |
| Stale element refs | flaky tests | Store `By` locators; re-find before each action |
| Hardcoded sleeps | slow, flaky | Explicit waits with expected conditions only |
| Datacenter proxies | immediate blocks | Residential/ISP proxies for production |

---

## Performance (Updated 2026)

1. **Selenium Grid / Selenoid** — parallel scraping across multiple machines
2. **`pageLoadStrategy: 'eager'`** — don't wait for full page load
3. **Session reuse** — single browser session for batch scrape
4. **Headless flags** — `--disable-dev-shm-usage`, `--disable-extensions`, `--disable-images`, `--disable-gpu`
5. **Selenium Manager cache** — warm cache in CI (`SE_CACHE_PATH`) for instant driver resolution
6. **Playwright migration** — 2-3x speedup for new projects; native parallelism, auto-waits

---

## Security (Updated 2026)

1. **Never commit ChromeDriver** — Selenium Manager handles; `.gitignore` `.cache/selenium/`
2. **Respect robots.txt** — `Crawl-Delay` + 2s+ polite delays
3. **Proxy rotation** — residential proxies for production scrapers
4. **Rate limiting** — random delays 1-5s; avoid aggressive concurrent requests
5. **Legal compliance** — check ToS; don't bypass auth or scrape copyrighted content
6. **CVE awareness** — ChromeDriver CVEs (e.g., CVE-2026-8000); keep Chrome + Selenium updated
7. **Disable telemetry** — `SE_AVOID_STATS=true` in locked-down CI

---

## Related Projects (in workspace)

- **Python-projects** — browser automation patterns
- **Django-Scrapy-Selenium** — shared Selenium + Celery automation concerns
- **rhixecompany-comics** — target where scraping utilities should migrate

---

## Resources (Updated 2026)

| Resource | URL | Description |
|----------|-----|-------------|
| Selenium docs | <https://www.selenium.dev/documentation> | Browser automation docs |
| Selenium waits | <https://www.selenium.dev/documentation/webdriver/waits> | Wait patterns |
| Node.js best practices | <https://github.com/goldbergyoni/nodebestpractices> | Node.js best practices |
| Puppeteer Stealth | <https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth> | Stealth evasion |
| Selenium Manager 2026 guide | <https://qaskills.sh/blog/selenium-manager-4-6-driver-management-2026-guide> | Driver management deep dive |
| Anti-detection 2026 | <https://use-apify.com/blog/web-scraping-anti-detection-2026> | Layered anti-bot bypass |
| Selenium JS API | <https://www.selenium.dev/selenium/docs/api/javascript> | Official JS bindings API |
| Selenium 4 upgrade | <https://www.selenium.dev/documentation/webdriver/troubleshooting/upgrade_to_selenium_4> | Migration guide |
| Playwright vs Selenium | <https://www.browserless.io/blog/playwright-vs-selenium-browser-automation-comparison> | 2026 comparison |
| Headless detection signals | <https://alterlab.io/blog/why-headless-browser-gets-detected-how-to-fix> | Detection vectors & fixes |