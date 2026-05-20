# Selenium WebDriver Project Documentation

**Project:** selenium_webdriver  
**Version:** 1.0.0  
**Date:** May 15, 2026  
**Target Website:** Asura Scans (asuracomic.net)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Project Structure](#project-structure)
5. [Code Documentation](#code-documentation)
6. [Configuration](#configuration)
7. [Output](#output)
8. [Troubleshooting](#troubleshooting)

---

## Project Overview

This project is a Node.js-based Selenium WebDriver web scraper designed to extract comic and manga data from Asura Scans website. It automates browsing, extracts detailed information about comics, chapters, and generates structured JSON output.

### Key Features

- Headless Chrome browser automation
- Comprehensive error handling with retry logic
- Extraction of comic metadata (title, author, artist, genres, description, rating)
- Chapter content extraction with image URLs
- Automatic pagination handling
- JSON output generation

### Technology Stack

- **Runtime:** Node.js 18+
- **Browser Automation:** Selenium WebDriver 4.34.0
- **Browser:** Google Chrome (headless mode)
- **Package Manager:** npm

---

## Installation

### Prerequisites

- Node.js 18 or higher
- Google Chrome browser installed
- npm package manager

### Steps

```bash
# Clone the repository
git clone https://github.com/rhixecompany/selenium_webdriver.git

# Navigate to project directory
cd selenium_webdriver

# Install dependencies
npm install
```

### Dependencies

**Production:**
- `selenium-webdriver` (4.34.0) - Browser automation framework
- `assert` (2.1.0) - Assertion library

**Development:**
- `prettier` (^3.6.2) - Code formatter
- `prettier-plugin-tailwindcss` (^0.6.14) - Tailwind CSS plugin
- `pretty-quick` (^4.2.2) - Prettier wrapper for quick formatting

---

## Usage

### Running the Main Scraper

```bash
npm run test
# or
node src/scrape.js
```

This command will:
1. Initialize headless Chrome browser
2. Navigate to Asura Scans series listing
3. Scrape comic details and chapters from multiple pages
4. Save results to JSON files
5. Clean up temporary data

### Running Alternative Scraper

```bash
node src/scrape2.js
```

A simplified version of the main scraper with different wait strategies.

### Running Basic Test

```bash
node src/test1.js
```

A simple Selenium test that demonstrates basic form interaction.

### Code Formatting

```bash
# Format all code
npm run format

# Check formatting without modifying
npm run format:check
```

---

## Project Structure

```
selenium_webdriver/
├── src/
│   ├── utils.js       # Reusable Selenium utility functions
│   ├── scrape.js     # Main scraping script (full features)
│   ├── scrape2.js    # Alternative scraping script
│   ├── test.js       # Test script with detailed driver setup
│   └── test1.js      # Basic Selenium test example
├── docs/
│   ├── code-docs/
│   │   ├── index.md  # Code documentation index
│   │   ├── utils.md # Utility functions documentation
│   │   └── scrape.md # Main scraper documentation
│   └── selenium_webdriver-docs.md # This file
├── package.json       # Project dependencies and scripts
├── README.md         # Quick start guide
└── .gitignore        # Git ignore rules
```

---

## Code Documentation

### src/utils.js

Provides reusable utility functions for Selenium WebDriver operations. All functions include retry logic for handling stale element references.

#### Functions

| Function | Description |
|----------|-------------|
| `exampleExplicitWait(driver)` | Demonstrates explicit wait patterns |
| `safeClick(driver, locator, maxRetries)` | Click with stale element retry (500ms delay) |
| `performGet(driver, url)` | Navigate to URL and wait for element |
| `clickElement(driver, locator, maxRetries)` | Click with retry logic |
| `clickNormalElement(driver, locator, maxRetries)` | Click without delay |
| `textElement(driver, locator, maxRetries)` | Get text with retry (500ms delay) |
| `textNormalElement(driver, locator, maxRetries)` | Get text without delay |
| `textareaElement(driver, locator, maxRetries)` | Get textarea content (trimmed) |
| `imageElement(driver, locator, maxRetries)` | Get image src attribute |
| `hrefElement(driver, locator, maxRetries)` | Get href attribute |
| `textElements(driver, locator, maxRetries)` | Get multiple elements |

#### Usage Example

```javascript
import { clickElement, textElement, hrefElement } from "./utils.js";

// Click a button
await clickElement(driver, By.css('.submit-button'));

// Get text from element
let title = await textElement(driver, By.xpath('//h1[@class="title"]'));

// Get link URL
let link = await hrefElement(driver, By.xpath('//a[@class="link"]'));
```

### src/scrape.js

The main scraping script that automates the complete scraping workflow.

#### Key Functions

1. **initializeDriver()** - Sets up Chrome with headless options
2. **parsePage(driver)** - Scrapes comic links from listing page
3. **parsePageComicDetail(driver)** - Extracts comic metadata
4. **parsePageChapterDetail(driver, updatedOn)** - Extracts chapter data
5. **automateProcess(url)** - Main execution flow

#### Data Extracted

**Comic Details:**
- Title, slug, serialization
- Author, artist
- Rating, status, type
- Genres (array)
- Images (cover, banner)
- Description
- Updated date

**Chapter Data:**
- Chapter name, title
- Page images (array of URLs)
- Parent comic info
- Update timestamp

### src/scrape2.js

Alternative scraping script with different wait strategies. Uses explicit waits instead of utility functions.

### src/test.js

Test script demonstrating detailed driver configuration using getBinaryPaths for explicit Chrome binary path specification.

### src/test1.js

Basic Selenium test example demonstrating:
- Driver creation
- Page navigation
- Element interaction
- Assertion usage

---

## Configuration

### Chrome Options

The scraper uses the following Chrome configuration:

```javascript
options.addArguments("--headless=new");
options.addArguments("--disable-gpu");
options.addArguments("--window-size=1920,1080");
options.addArguments(`--user-data-dir=${userDataDir}`);
options.addArguments("--no-sandbox");
options.addArguments("--disable-dev-shm-usage");
options.addArguments("--enable-unsafe-swiftshader");
options.setPageLoadStrategy("eager");
options.setAcceptInsecureCerts(true);
options.excludeSwitches("enable-automation");
```

### Pagination

Default configuration:
- **Start URL:** `https://asuracomic.net/series?page=1`
- **Total Pages:** 20 (configurable in code)
- **Chapter Limit:** 3 chapters per comic (configurable)

### User Data Directory

A temporary user data directory is created for each run to ensure browser isolation:
- Location: System temp directory
- Cleanup: Automatic after scraper completes

---

## Output

### comics.json

Generated in project root after successful scrape. Contains array of comic objects:

```json
[
  {
    "title": "Comic Title",
    "images": [
      { "url": "https://..." },
      { "url": "https://..." }
    ],
    "description": "Comic description...",
    "slug": "comic-slug",
    "serialization": "Serialization info",
    "author": "Author Name",
    "artist": "Artist Name",
    "rating": "4.5",
    "status": "Ongoing",
    "type": "Manga",
    "genres": [
      { "name": "Action" },
      { "name": "Fantasy" }
    ],
    "updatedOn": "2026-05-15"
  }
]
```

### chapters.json

Generated in project root after successful scrape. Contains array of chapter objects:

```json
[
  {
    "name": "Chapter 1",
    "title": "The Beginning",
    "images": [
      { "url": "https://.../page1.jpg" },
      { "url": "https://.../page2.jpg" }
    ],
    "comictitle": "Comic Title",
    "comicslug": "comic-slug",
    "updatedOn": "2026-05-15"
  }
]
```

---

## Troubleshooting

### Common Issues

1. **Element not found within timeout**
   - Check website structure hasn't changed
   - Increase wait times in code
   - Verify XPath selectors

2. **StaleElementReferenceError**
   - Normal - retry logic handles this automatically
   - If persistent, page may be dynamically updating

3. **Chrome not found**
   - Ensure Chrome is installed
   - Check Chrome binary path in test.js

4. **No comics found**
   - Verify internet connection
   - Check if target website is accessible
   - Review console for specific errors

### Debugging Tips

- Run in non-headless mode (remove `--headless=new`) to see browser actions
- Add console.log statements to trace execution
- Use smaller page counts for testing
- Check generated JSON files for partial results

---

## License

ISC

---

## Contributing

For issues or feature requests, please contact the repository maintainer.