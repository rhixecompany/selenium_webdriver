# Code Documentation Index

This directory contains detailed code documentation for the selenium_webdriver project.

## Contents

1. [utils.md](utils.md) - Utility functions for Selenium operations
2. [scrape.md](scrape.md) - Main scraping script documentation

## Quick Reference

### Importing Utilities

```javascript
import {
  clickElement,
  textElement,
  textElements,
  textareaElement,
  imageElement,
  hrefElement,
  performGet,
  clickNormalElement,
  textNormalElement,
} from "./utils.js";
```

### Running the Scraper

```bash
node src/scrape.js
```

### Key Patterns

- All functions are async and return Promises
- Retry logic handles StaleElementReferenceError
- Use By.xpath() for complex selectors
- Use until.elementLocated() for explicit waits