# selenium_webdriver — Architecture Blueprint

> **Generated:** 2026-07-24
> **Project Type:** Node.js Selenium Web Scraper (Comics/Manga)
> **Architecture Pattern:** Script-Driven Browser Automation

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Goals](#architecture-goals)
3. [System Context Diagram](#system-context-diagram)
4. [Container Architecture](#container-architecture)
5. [Module Architecture](#module-architecture)
6. [Data Flow](#data-flow)
7. [Error Handling Strategy](#error-handling-strategy)
8. [Scraping Lifecycle](#scraping-lifecycle)
9. [Architecture Decisions](#architecture-decisions)
10. [Extensibility Points](#extensibility-points)

---

## Project Overview

A Node.js browser-automation tool using **Selenium WebDriver 4.x** to scrape JavaScript-rendered comic/manga content from Asura Scans (`asuracomic.net`). The scraper navigates multi-page listings, extracts comic metadata (title, author, artist, rating, genres, description, cover images), drills into individual chapter pages, and persists structured JSON output to disk.

**Target Site:** `https://asuracomic.net/series?page=1`  
**Output:** `comics.json`, `chapters.json`

---

## Architecture Goals

| Goal | Description |
|------|-------------|
| **Reliability** | Robust element interaction via explicit waits and StaleElement retry |
| **Determinism** | No `sleep()` — all waits are condition-based via `WebDriverWait` |
| **Resource Safety** | Guaranteed `driver.quit()` via `try/finally`; temp profile cleanup |
| **Stealth** | Headless execution with automation-detect mitigation flags |
| **Simplicity** | Zero build step, zero deployment, zero external infrastructure |

---

## System Context Diagram

```mermaid
C4Context
  title System Context — Selenium WebDriver Scraper

  Person(user, "Developer", "Runs node src/scrape.js or npm test")
  System_Boundary(scraper_system, "selenium_webdriver Scraper") {
    System(scraper, "Selenium Scraper", "Node.js 18+ script that automates Chrome to scrape comics/manga")
  }
  System_Ext(site, "Asura Scans", "Target website with JavaScript-rendered comic listings and chapters")
  System_Ext(fs, "Local Filesystem", "Persists scraped data as comics.json and chapters.json")

  Rel(user, scraper, "Invokes via CLI")
  Rel(scraper, site, "HTTP GET via ChromeDriver")
  Rel(site, scraper, "Rendered HTML via Chrome")
  Rel(scraper, fs, "Writes JSON output")
```

---

## Container Architecture

```mermaid
C4Container
  title Container Diagram — selenium_webdriver

  Person(user, "Developer")

  System_Boundary(scraper, "selenium_webdriver") {
    Container(entry, "scrape.js", "Node.js + Selenium 4.34", "Main scraper — pagination, comic detail, chapter detail")
    Container(utils, "utils.js", "Node.js ES Module", "Retry wrappers: clickElement, textElement, imageElement, hrefElement")
    Container(test, "test1.js", "Node.js + Selenium", "Selenium smoke test with known form page")
    Container(scrape2, "scrape2.js", "Node.js + Selenium", "Simplified scraper variant, fewer features")
    Container(test_scrape, "test.js", "Node.js + Selenium", "Alternative scraper with getBinaryPaths, retry loop")
  }

  System_Ext(chrome, "ChromeDriver / Chrome", "Headless=new browser instance")
  System_Ext(site, "asuracomic.net", "Comic/manga target site")
  System_Ext(fs, "Local Filesystem", "JSON output files")

  Rel(user, entry, "node src/scrape.js", "CLI")
  Rel(entry, utils, "imports", "ES Module import")
  Rel(scrape2, utils, "imports", "ES Module import")
  Rel(entry, chrome, "WebDriver session", "ChromeOptions → Builder.forBrowser")
  Rel(scrape2, chrome, "WebDriver session", "")
  Rel(test, chrome, "WebDriver session", "")
  Rel(test_scrape, chrome, "WebDriver session", "getBinaryPaths")
  Rel(chrome, site, "HTTP GET /series?page=N", "Target URL")
  Rel(entry, fs, "writeFileSync", "comics.json, chapters.json")
  Rel(scrape2, fs, "writeFileSync", "comics.json, chapters.json")
```

---

## Module Architecture

```mermaid
classDiagram
  class scrape_js {
    +async initializeDriver()
    +async parsePage(driver)
    +async parsePageComicDetail(driver)
    +async parsePageChapterDetail(driver, updatedOn)
    +async automateProcess(url)
    -driver
    -comicData[]
    -chapterData[]
    -newChapterData[]
    -userDataDir
  }

  class utils_js {
    +async performGet(driver, url)
    +async clickElement(driver, locator, maxRetries)
    +async clickNormalElement(driver, locator, maxRetries)
    +async textElement(driver, locator, maxRetries)
    +async textNormalElement(driver, locator, maxRetries)
    +async textElements(driver, locator, maxRetries)
    +async imageElement(driver, locator, maxRetries)
    +async hrefElement(driver, locator, maxRetries)
    +async textareaElement(driver, locator, maxRetries)
    +async safeClick(driver, locator, maxRetries)
    +async exampleExplicitWait(driver)
  }

  scrape_js --> utils_js : imports helper functions
```

---

## Data Flow

```mermaid
sequenceDiagram
  participant User
  participant scrape as scrape.js
  participant utils as utils.js
  participant chrome as ChromeDriver
  participant site as asuracomic.net
  participant fs as Filesystem

  User->>scrape: node src/scrape.js
  scrape->>scrape: initializeDriver()
  scrape->>chrome: ChromeOptions (headless, window-size, user-data-dir)
  chrome-->>scrape: WebDriver instance

  loop Each page (1-20)
    scrape->>utils: performGet(driver, url)
    utils->>chrome: driver.get(url)
    chrome->>site: GET /series?page=N
    site-->>chrome: Rendered HTML
    chrome-->>utils: Page loaded
    utils-->>scrape: Done

    scrape->>scrape: parsePage(driver)

    loop Each comic link on page
      scrape->>utils: textElements(driver, By.xpath)
      utils-->>scrape: comic link elements
      scrape->>utils: clickElement(driver, link)
      chrome-->>scrape: Navigated to comic detail
      scrape->>scrape: parsePageComicDetail(driver)
      scrape->>scrape: Extract title, author, artist, rating, status, genres, images, description
      scrape->>scrape: push to comicData[]

      loop Each chapter (1-3 per comic)
        scrape->>utils: clickNormalElement(driver, chapter)
        chrome-->>scrape: Navigated to chapter
        scrape->>scrape: parsePageChapterDetail(driver)
        scrape->>scrape: Extract name, title, images, slug
        scrape->>scrape: push to newChapterData[]
        scrape->>utils: driver.navigate().back()
      end

      scrape->>scrape: chapterData.push(...newChapterData)
      scrape->>utils: driver.navigate().back()
    end

    scrape->>utils: clickElement(driver, next-page button)
  end

  scrape->>fs: writeFileSync(comics.json)
  scrape->>fs: writeFileSync(chapters.json)
  scrape->>scrape: driver.quit() + rmSync(userDataDir)
  User-->>scrape: Done
```

---

## Error Handling Strategy

```mermaid
flowchart TD
    A[Element interaction] --> B{StaleElementReference?}
    B -->|Yes - retry ≤ 3| C[Re-query element]
    C --> D[500ms delay]
    D --> A
    B -->|No| E{Other error?}
    E -->|Yes| F[Throw / log error]
    E -->|No| G[Success]
    B -->|3 retries exhausted| H[Throw Error: Failed after N retries]
```

| Error Scenario | Handling |
|----------------|----------|
| `StaleElementReferenceException` | Retry up to 3× with 500ms delay, then throw |
| Element not found / timeout | Catch, log, continue to next element |
| Navigation failure | Catch in outer `try/catch`, log error |
| Driver leak | `driver.quit()` in `finally` block |
| Temp profile leak | `fs.rmSync(userDataDir)` in `finally` block |

---

## Scraping Lifecycle

```mermaid
stateDiagram-v2
  [*] --> InitDriver
  InitDriver --> NavigateToListing
  NavigateToListing --> ParsePage

  state ParsePage {
    [*] --> ForEachComic
    ForEachComic --> ParseComicDetail
    ParseComicDetail --> ForEachChapter
    ForEachChapter --> ParseChapterDetail
    ParseChapterDetail --> BackToComicDetail
    BackToComicDetail --> ForEachChapter : More chapters
    BackToComicDetail --> BackToListing : All chapters done
    BackToListing --> ForEachComic : More comics
    BackToListing --> [*]
  }

  ParsePage --> NextPage
  NextPage --> ParsePage : More pages?
  NextPage --> WriteOutput : No more pages
  WriteOutput --> Cleanup
  Cleanup --> [*]
```

---

## Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **Selenium over Scrapy** | Target site is a JS-heavy SPA — needs a real browser to render |
| **Selenium over Playwright** | Existing codebase investment; Playwright noted as potential migration path |
| **ES Modules** | Modern Node.js standard; `"type": "module"` in package.json |
| **No build step** | Direct `node` execution; no transpilation overhead |
| **No deployment** | Local/CI execution only; no server infrastructure needed |
| **Headless=new** | Stealthier headless mode (Chrome 109+) with full rendering |
| **Chrome temp profiles** | Isolated browser state per run; auto-cleaned in finally |
| **XPath selectors** | Target site uses Tailwind CSS with dynamic class ordering — XPath with `contains()` is more robust than CSS selectors |

---

## Extensibility Points

1. **New target sites** — Add new parse functions following the same retry-wrapper pattern
2. **Database persistence** — Replace `writeFileSync` with SQLite or MongoDB writes
3. **Proxy rotation** — Pass `--proxy-server` via Chrome options
4. **User-agent rotation** — Randomize `user-agent` in Chrome options per page
5. **Playwright migration** — Port high-level parse logic, replace Selenium-specific imports
6. **CLI arguments** — Add `commander` or `yargs` for URL/target/page-count parameters
7. **Parallel scraping** — Use `p-limit` to cap concurrent browser sessions
8. **WebDriver BiDi** — Upgrade to BiDi protocol for network interception (block images/CSS)

---

*Generated by architecture-blueprint-generator — comprehensive analysis*
