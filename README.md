# selenium_webdriver — Chrome Web Scraper

> **Stack:** Node.js 18+ + Selenium | **Type:** CLI Scraper Tool | **Status:** Active

A Node.js Selenium-based web scraper targeting comics/manga sites. Uses Selenium WebDriver 4.x with ChromeDriver for dynamic content scraping. ES modules throughout.

---

## Technology Stack

| Category | Technology |
|---|---|
| **Runtime** | Node.js ^18+ |
| **Language** | JavaScript (ES Modules) |
| **Browser Automation** | selenium-webdriver 4.34.0 |
| **Testing** | assert (built-in) |
| **Formatting** | Prettier ^3.6.2 |

## Architecture

```
selenium_webdriver/
├── src/
│   └── scrape.js          # Main scraper entry point
├── package.json
└── docs/Project_Architecture/
```

## Getting Started

```bash
# Prerequisites: Node.js 18+, ChromeDriver installed

# Install dependencies
npm install

# Run the scraper
node src/scrape.js

# Run test (executes scraper)
npm test

# Format code
npm run format
npm run format:check
```

## Key Features

- **Selenium WebDriver 4.x** — Browser automation for dynamic content
- **ChromeDriver** — Chrome browser automation
- **Explicit Waits** — `WebDriverWait` with conditions (no sleep-based waits)
- **Stale Element Handling** — Retry on `StaleElementReferenceException`
- **Consistent Selectors** — Standardized `By` selector patterns
- **Proper Cleanup** — `driver.quit()` in `finally` block

## Coding Standards

- **ES Modules**: `"type": "module"` in package.json
- **camelCase**: Variable and function naming
- **Prettier**: 2-space indentation
- **Error Handling**: Try/catch with retries

## Best Practices

### Wait Strategy
```javascript
// Explicit WebDriverWait — never use sleep
await driver.wait(until.elementLocated(By.css('.selector')), 10000);
```

### Stale Element Handling
```javascript
// Retry on stale elements
async function clickSafely(element) {
  try {
    await element.click();
  } catch (StaleElementReferenceException) {
    await element.click(); // Retry once
  }
}
```

### Cleanup
```javascript
// Always quit driver in finally
try {
  // scraping logic
} finally {
  await driver.quit();
}
```

## Security

- No ChromeDriver or browser profiles in VCS
- Respect `robots.txt`
- Configurable polite delays between requests
- No build step required
- No deployment configuration

## Notes

- No build step — run directly with Node.js
- Manual testing via `node src/scrape.js`
- ChromeDriver must be installed separately (not in VCS)
- Designed for comics/manga sites

## License

Not specified.
