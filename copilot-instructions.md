# selenium_webdriver — Chrome Scraper

**Naming**: `camelCase` for JavaScript variables/functions; `PascalCase` for classes; `UPPER_SNAKE_CASE` for constants; `kebab-case` for file names and directories.

**Patterns**: ES Modules (`"type": "module"` in package.json); explicit `WebDriverWait` with expected conditions (never `time.sleep()`); retry wrapper on `StaleElementReferenceException`; consistent `By` selectors (By.css, By.xpath, By.className); `driver.quit()` in `finally` block always; polite delays between requests.

**Structure**: `src/scrape.js` (main scraper entry); `node_modules/` (dependencies); no build step; no deployment; manual testing via `node src/scrape.js`.

**Node.js**: Node.js 18+; `selenium-webdriver` 4.x + ChromeDriver; Prettier (2-space indent) for formatting; no TypeScript; no bundler.

**Scraping**: Target: comics/manga websites; navigate via Selenium WebDriver; wait for elements with explicit conditions; extract data with `getText()`, `getAttribute()`, `findElements()`; handle dynamic content loading; rotate user-agents; respect `robots.txt`.

**Error Handling**: Retry stale element references (up to 3 attempts); timeout on `WebDriverWait` with `TimeoutException` catch; graceful degradation on element not found; log all failures with context.

**Security**: No ChromeDriver or browser profiles in VCS; no credentials committed; no `.env` in VCS; respect website terms of service.

**Env**: Optional `CHROME_PATH`, `CHROME_DRIVER_PATH`, `PROXY_URL`.

**Commands**: `npm install` (setup); `node src/scrape.js` (run); `npm test` (executes scrape.js); `npm run format` (Prettier).
