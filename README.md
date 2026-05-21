# Selenium WebDriver Web Scraper

A Node.js-based Selenium WebDriver project for scraping comic/manga data from Asura Scans website.

## Overview

This project provides automated web scraping capabilities using Selenium WebDriver with Chrome. It extracts comic details, chapter information, and generates JSON output files.

## Features

- Headless Chrome browser automation
- Comic listing page scraping
- Comic detail page extraction (title, author, artist, genres, description, rating)
- Chapter listing and content scraping
- Automatic retry logic for stale elements
- Multiple utility functions for common Selenium operations

## Requirements

- Node.js 18+
- Chrome browser installed
- npm dependencies (see package.json)

## Installation

```bash
# Clone the repository
git clone https://github.com/rhixecompany/selenium_webdriver.git

# Navigate to project directory
cd selenium_webdriver

# Install dependencies
npm install
```

## Usage

### Run Main Scraper

```bash
npm run test
# or
node src/scrape.js
```

This will:
1. Initialize headless Chrome browser
2. Navigate to Asura Scans series listing
3. Scrape comic details and chapters
4. Output results to `comics.json` and `chapters.json`

### Run Basic Test

```bash
node src/test1.js
```

### Code Formatting

```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

## Project Structure

```
selenium_webdriver/
├── src/
│   ├── utils.js       # Utility functions for Selenium operations
│   ├── scrape.js     # Main scraping script
│   ├── scrape2.js    # Alternative scraping script
│   ├── test.js       # Test script with detailed driver setup
│   └── test1.js      # Basic Selenium test example
├── docs/              # Documentation
├── package.json       # Project dependencies
└── README.md         # This file
```

## Utility Functions (utils.js)

| Function | Description |
|----------|-------------|
| `exampleExplicitWait(driver)` | Demonstrates explicit wait patterns |
| `safeClick(driver, locator, maxRetries)` | Click with stale element retry |
| `performGet(driver, url)` | Navigate to URL and wait for element |
| `clickElement(driver, locator, maxRetries)` | Click with retry logic |
| `clickNormalElement(driver, locator, maxRetries)` | Click without delay |
| `textElement(driver, locator, maxRetries)` | Get text with retry |
| `textNormalElement(driver, locator, maxRetries)` | Get text without delay |
| `textareaElement(driver, locator, maxRetries)` | Get textarea content |
| `imageElement(driver, locator, maxRetries)` | Get image src attribute |
| `hrefElement(driver, locator, maxRetries)` | Get href attribute |
| `textElements(driver, locator, maxRetries)` | Get multiple elements |

## Configuration

The scraper uses the following Chrome options:
- Headless mode (`--headless=new`)
- Window size: 1920x1080
- No sandbox mode
- Disabled GPU acceleration
- Custom user data directory for isolation

## Output

The scraper generates:
- `comics.json` - Array of comic objects with details
- `chapters.json` - Array of chapter objects with image URLs

## License

ISC