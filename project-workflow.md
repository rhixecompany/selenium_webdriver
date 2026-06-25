# Project Workflow — selenium_webdriver

## Setup

```bash
npm install
# Ensure Chrome browser is installed
```

## Running

```bash
# Main scraper
npm test                # runs node src/scrape.js
node src/scrape.js      # or directly

# Other scripts
node src/scrape2.js
node src/test.js
node src/test1.js
```

## Code Quality

```bash
npm run format           # Prettier format
npm run format:check     # Check formatting
```

## Adding a New Scraper
1. Create new file in `src/` with camelCase naming
2. Use `selenium-webdriver` with ES Module imports
3. Implement explicit waits with `WebDriverWait`
4. Handle `StaleElementReferenceException` with retry
5. Always call `driver.quit()` in `finally` block
