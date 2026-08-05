# The Story of selenium_webdriver

_The scraper that refused to die_

---

## Prologue: The Manga Problem

You want to read a manga series. The official site: region-locked. The aggregator sites: watermarked, missing chapters, aggressive ads, broken navigation.

**Solution:** Write a scraper. Download the chapters. Read locally. Clean.

---

## Chapter 1: The Stack Choice

**Node.js + Selenium WebDriver 4.**

Why not Python? The workspace already had Python scrapers (Scrapy, Selenium in `Django-Scrapy-Selenium`). Why not Puppeteer/Playwright? Chrome DevTools Protocol is faster, but some sites detect headless Chrome. Selenium with a real Chrome profile bypasses more bot detection.

**Minimal deps:**

```json
{
  "dependencies": {
    "selenium-webdriver": "4.34.0"
  },
  "devDependencies": {
    "prettier": "^3.6.2"
  }
}
```

---

## Chapter 2: The Convention Discipline

Every scraper follows the same rules:

```javascript
// src/scrape.js
import { Builder, By, until } from "selenium-webdriver";

async function scrape() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://example.com/manga");

    // EXPLICIT WAIT — never sleep()
    await driver.wait(until.elementLocated(By.css(".chapter-list")), 15000);

    // RETRY on stale elements
    const chapters = await retryAsync(() =>
      driver.findElements(By.css(".chapter-item a")),
    );

    // CLEANUP in finally
    return chapters.map((el) => el.getAttribute("href"));
  } finally {
    await driver.quit(); // ALWAYS
  }
}
```

**Rules posted in AGENTS.md:**

1. `WebDriverWait` + expected conditions only
2. Retry `StaleElementReferenceException` (3x, exponential backoff)
3. `By.css` preferred, `By.xpath` for complex selectors
4. `driver.quit()` in `finally` — no exceptions
5. Respect `robots.txt`, polite delays (2-5s between requests)

---

## Chapter 3: The Output Format

```json
// comics.json
[
  {
    "title": "One Piece",
    "url": "https://site.com/one-piece",
    "chapters": [
      { "number": 1089, "url": "https://site.com/one-piece/1089" },
      { "number": 1088, "url": "https://site.com/one-piece/1088" }
    ]
  }
]
```

Simple. Portable. Consumable by the Next.js reader (`rhixe_scans`) or the Django backend (`rhixecompany-comics`).

---

## Chapter 4: No CI, No Problem (Until There Was)

Originally: **no CI.** Manual `npm test` (which runs `node src/scrape.js`). Manual `npm run format`.

Then the repo-management sweep added:

- `.github/workflows/selenium-webdriver-ci.yml`
- TypeScript check (even though it's JS — `tsc --noEmit --checkJs`)
- Prettier format check
- Test execution

**The test passes.** The scraper works. The format is clean.

---

## Chapter 5: The Consolidation Verdict

**P1 Priority:** Merge into `rhixecompany-comics/backend/apps/scrapers/selenium_utils.py`

| Aspect     | Current (Node)     | Target (Python)                    |
| ---------- | ------------------ | ---------------------------------- |
| Language   | JavaScript (ESM)   | Python 3.11+                       |
| Framework  | selenium-webdriver | selenium + undetected-chromedriver |
| Execution  | Manual CLI         | Celery task                        |
| Output     | `comics.json`      | Django ORM upsert                  |
| Scheduling | Manual             | Celery Beat                        |
| Monitoring | Console logs       | Flower + Sentry                    |

**The Node version will be deleted.** Not archived — deleted. The Python version in the consolidated platform _is_ the continuation.

---

## Epilogue: The Scraper That Became a Module

Started as a 50-line script. Became a disciplined tool with conventions, CI, and a migration path.

The code isn't precious. The _patterns_ are:

- Explicit waits over sleeps
- Retry on stale elements
- Cleanup in finally
- Polite scraping

Those patterns live on in `rhixecompany-comics`. The rest is just syntax.

---

_Written by the workspace chronicler, July 25, 2025.  
Filed at `projects/selenium_webdriver/THE_STORY_OF_THIS_REPO.md`._
