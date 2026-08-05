# Copilot Instructions

Project-wide guidance for the Selenium scraping utility.

## Source of truth

- `projects/selenium_webdriver/AGENTS.md`
- `README.md`
- `src/`

## Commands

Run from the project root:

```bash
npm install
npm test
node src/scrape.js
node src/scrape2.js
node src/test.js
node src/test1.js
npm run format
npm run format:check
```

## Architecture

- Node.js ES module scripts automate Chrome through selenium-webdriver.
- Main scripts scrape listings, detail pages, and chapter data into JSON output.
- The project is a scraping utility, not a server.

## Conventions

- Use explicit waits and retry stale elements instead of sleep-based timing.
- Always close browser sessions with `driver.quit()` in `finally`.
- Keep selectors and browser setup centralized where possible.
- Respect target-site limits and avoid hardcoded credentials.
