# selenium_webdriver — Chrome Scraper

## Architecture
- **Type:** Node.js Selenium scraper for comics/manga
- **Pattern:** Script-based scraping with explicit waits and error handling
- **Reference:** [Workflow Analysis](docs/Project_Architecture/Workflow_Analysis.md), [Exemplars](docs/Project_Architecture/exemplars.md)

Node.js 18+ Selenium WebDriver scraper for comics/manga. ES Modules, ChromeDriver, manual invocation via `node src/scrape.js`.

## Stack
- **Runtime:** Node.js 18+
- **Library:** `selenium-webdriver` 4.x + ChromeDriver
- **Formatting:** Prettier (2-space indent)
- **Module System:** ES Modules (type: module)

## Commands
```bash
npm install
npm test               # runs scrape.js
node src/scrape.js
npm run format
```

## Conventions
- Explicit `WebDriverWait` with expected conditions — never use `sleep()`
- Retry logic on `StaleElementReferenceException`
- Consistent `By` selector strategy (prefer `By.css` or `By.xpath`)
- `driver.quit()` in `finally` block to ensure cleanup
- No build step; no deployment pipeline
- `robots.txt` compliance + polite delays between requests

## Notes
- No ChromeDriver/profiles committed to VCS
- Manual testing via `node src/scrape.js`
- ES Modules throughout
- No CI/CD — standalone scraper tool
