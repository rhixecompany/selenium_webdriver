# scrape.js - Main Scraper Documentation

## Overview

The `scrape.js` is the primary scraping script that automates web scraping of comic data from Asura Scans. It uses Selenium WebDriver with Chrome in headless mode.

## Key Components

### Driver Initialization

```javascript
async function initializeDriver()
```

Sets up Chrome with the following options:
- Headless mode (`--headless=new`)
- Window size: 1920x1080
- No sandbox mode
- No GPU acceleration
- Custom user data directory (temporary)
- Eager page load strategy
- Accept insecure certificates
- Excludes automation switches

### Main Functions

#### parsePage(driver)

Scrapes comic links from the series listing page.

**Process:**
1. Finds all comic links using XPath
2. Iterates through each link
3. Clicks each link to navigate to detail page
4. Extracts comic details via `parsePageComicDetail()`
5. Navigates back to listing page

**XPath Selector:**
```xpath
//div[@class='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4']/a
```

---

#### parsePageComicDetail(driver)

Extracts detailed information from a comic's detail page.

**Extracted Fields:**
- `title` - Comic title
- `slug` - URL slug
- `serialization` - Serialization info
- `author` - Author name
- `artist` - Artist name
- `rating` - Comic rating
- `status` - Publication status
- `type` - Comic type
- `genres` - Array of genre objects
- `images` - Cover image URLs (primary and secondary)
- `description` - Comic description
- `updatedOn` - Last update date

**Chapter Processing:**
- Extracts up to 3 latest chapters
- Navigates to each chapter page
- Calls `parsePageChapterDetail()` for each chapter

---

#### parsePageChapterDetail(driver, updatedOn)

Extracts chapter-specific data.

**Extracted Fields:**
- `name` - Chapter name
- `title` - Chapter title (if available)
- `images` - Array of page image URLs
- `comictitle` - Parent comic title
- `comicslug` - Parent comic slug
- `updatedOn` - Update timestamp

---

### Main Execution Flow

```javascript
async function automateProcess(url)
```

1. Initialize driver
2. Navigate to base URL
3. Loop through pages (1 to 20)
4. Parse each page
5. Navigate to next page
6. Write results to JSON files
7. Cleanup (quit driver, remove temp files)

### Output Files

#### comics.json
Contains array of comic objects with full details.

#### chapters.json
Contains array of chapter objects with page images.

## Configuration

**Target URL:** `https://asuracomic.net/series?page=1`

**Pagination:** Configured for 20 pages (can be modified)

**Chapter Limit:** Scrapes first 3 chapters per comic

## Error Handling

- Uses try-catch blocks for element location errors
- Implements retry logic in utility functions
- Logs errors to console
- Ensures cleanup in finally block