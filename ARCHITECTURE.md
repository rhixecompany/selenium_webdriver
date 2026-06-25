# Architecture — selenium_webdriver

## Overview
A Node.js-based Selenium WebDriver project for automating Chrome browser to scrape comic/manga data from websites.

## Architecture

### Scraper Pipeline
```
Script Start → Launch ChromeDriver → Navigate to URL → Wait for elements → Extract data → JSON output → Cleanup (driver.quit())
```

### Key Patterns
1. **Explicit Waits**: Uses `WebDriverWait` instead of implicit waits or `sleep()`
2. **Stale Element Handling**: Built-in retry logic for `StaleElementReferenceException`
3. **Consistent Selectors**: Uses `By` selectors throughout
4. **Cleanup**: Always calls `driver.quit()` in `finally` blocks

### Data Flow
```
Target Website → Chrome Browser (automated) → DOM Parsing → JSON Data Files
```

## Design Decisions
- No build step: run directly with Node.js
- ES Modules for modern JavaScript
- JSON output for portability
