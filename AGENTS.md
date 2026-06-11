# AGENTS.md

> **Refreshed by AGENTS workflow 2026-06-01**

## Project Overview

A Node.js-based Selenium WebDriver web scraping project for automating Chrome browser to extract comic/manga data. Scrapes comic listings, details, chapters, and generates JSON output files with retry logic for stale elements.

**Tech Stack:**
- **Runtime**: Node.js 18+ with ES Modules (`"type": "module"`)
- **Automation**: selenium-webdriver 4.x with ChromeDriver
- **Formatting**: Prettier with Tailwind CSS plugin
- **Testing**: Manual (node src/scrape.js)
- **Scripts**: scrape.js, scrape2.js, test.js, test1.js, utils.js

## Hermes and Copilot

- Use the nearest `AGENTS.md` for files under `projects/selenium_webdriver/`;
  this file is the local fallback.
- `projects/selenium_webdriver/.github/copilot-instructions.md` is the primary
  Copilot guidance file for this project.
- Root Hermes orchestration assets live in `../../.github/agents/hermes.agent.md`
  and `../../.github/prompts/`.
- Keep this file, the local Copilot instructions, and the scraper scripts
  aligned when selectors, retries, or output formats change.

## Setup Commands

```bash
# Install dependencies
npm install

# Ensure Chrome browser is installed
# The project uses ChromeDriver for browser automation
```

## Development Workflow

```bash
# Run the main scraper
npm test  # runs node src/scrape.js

# Run individual scripts
node src/scrape.js
node src/scrape2.js
node src/test.js

# Format code
npm run format

# Check formatting
npm run format:check
```

## Testing Instructions

```bash
# Run test scripts
node src/test.js
node src/test1.js

# Verify scraped JSON output in generated files
```

## Code Style

- **JavaScript**: ES Modules (import/export), modern JS features
- **Formatting**: Prettier with 2-space indentation
- **Selenium Patterns**: 
  - Always use explicit `WebDriverWait` (not implicit waits or sleep)
  - Handle `StaleElementReferenceException` with retry logic
  - Use `By` selectors consistently
  - Clean up with `driver.quit()` in finally blocks
- **File naming**: camelCase.js

## Build/Deployment

```bash
# No build step — run directly with Node.js
node src/scrape.js
```

No deployment configuration. Used as a utility/automation tool, not a web service.

## Security

- Never commit ChromeDriver binary or browser profiles
- Avoid hardcoding target URLs — use constants at top of files
- Respect `robots.txt` and implement polite scraping delays
- Rotate user-agents if implementing at scale
- No credentials or API keys stored in this project

## Troubleshooting

- **ChromeDriver not found**: Install Chrome/Chromium and ensure matching ChromeDriver version
- **Script fails on navigation**: Check target website structure changes — update selectors
- **Stale element errors**: The project has built-in retry logic; check if selectors need updating
- **Memory issues**: Close browser sessions with `driver.quit()` after scraping
- **Node.js version**: Ensure Node.js 18+ is installed
