# selenium_webdriver — Folder Structure Blueprint

> **Generated:** 2026-07-24
> **Project Type:** Node.js + Selenium WebDriver Web Scraper
> **Package Manager:** npm (bun.lock present for Bun compatibility)

---

## Table of Contents

1. [Directory Tree](#directory-tree)
2. [Naming Conventions](#naming-conventions)
3. [File Placement Patterns](#file-placement-patterns)
4. [Auto-Detection Indicators](#auto-detection-indicators)
5. [Key Folder Descriptions](#key-folder-descriptions)
6. [Configuration Files](#configuration-files)
7. [Documentation Files](#documentation-files)

---

## Directory Tree

```
selenium_webdriver/
│
├── .github/
│   ├── copilot-instructions.md      # GitHub Copilot context
│   └── workflows/
│       └── ci.yml                    # CI pipeline configuration
│
├── .vscode/
│   ├── extensions.json               # Recommended extensions
│   ├── launch.json                   # Debug launch profiles
│   ├── settings.json                 # Editor settings
│   └── tasks.json                    # Task runner config
│
├── docs/
│   ├── code-docs/
│   │   ├── index.md                  # Docs index
│   │   ├── scrape.md                 # Main scraper docs
│   │   └── utils.md                  # Utility function docs
│   │
│   ├── Project_Architecture/
│   │   ├── exemplars.md              # Code exemplars
│   │   ├── Project_Architecture_Blueprint.md
│   │   ├── Project_Folder_Structure.md
│   │   ├── selenium_webdriver_architecture.md
│   │   ├── selenium_webdriver_folders.md
│   │   ├── selenium_webdriver_techstack.md
│   │   └── Technology_Stack_Blueprint.md
│   │   └── Workflow_Analysis.md
│   │
│   ├── selenium_webdriver-docs.md
│   └── selenium-webdriver-triage-context.md
│
├── src/
│   ├── scrape.js                     # [PRIMARY] Main scraper — 20 pages, comics + chapters
│   ├── scrape2.js                    # Simplified scraper variant (fewer features)
│   ├── test.js                       # Alternative scraper using getBinaryPaths
│   ├── test1.js                      # Selenium smoke test (web-form page)
│   └── utils.js                      # Shared retry wrappers for DOM interactions
│
├── .dockerignore
├── .editorconfig                     # EditorConfig (CRLF, indent=2)
├── .env.example                      # Environment variable template
├── .eslintignore
├── .gitignore
├── .prettierignore
├── .prettierrc                       # Prettier config (2-space indent)
├── AGENTS.md                         # Project context for AI agents
├── API_REFERENCE.md                  # API reference documentation
├── ARCHITECTURE.md                   # Architecture overview
├── AUDIT_selenium_webdriver.md       # Audit findings report
├── bun.lock                          # Bun lockfile
├── code-exemplars.md                 # Code patterns and examples
├── CONTRIBUTING.md                   # Contribution guide
├── copilot-instructions.md           # Copilot-specific context
├── cross-linking-report.md           # Document cross-reference report
├── DATABASE_SCHEMA.md                # Database schema documentation
├── DEPLOYMENT_GUIDE.md               # Deployment instructions
├── DEVELOPMENT_GUIDE.md              # Developer setup guide
├── execution-summary.md              # Execution run summary
├── folder-structure.md               # Previous folder structure doc
├── package.json                      # Dependencies and scripts
├── project-workflow.md               # Project workflow documentation
├── README.md                         # Project readme
├── REPOSITORY_SUMMARY.md             # Repository overview
├── RESEARCH_REPORT.md                # Research findings (Selenium 4, BiDi, etc.)
├── SECURITY.md                       # Security policy
├── SETUP_GUIDE.md                    # Setup instructions
├── technology-stack.md               # Previous tech stack doc
├── TESTING_GUIDE.md                  # Testing guide
├── THE_STORY_OF_THIS_REPO.md         # Repository narrative
├── validation-report.md              # Validation findings
└── web-research-selenium-webdriver.md # Web research notes
```

---

## Naming Conventions

| Category | Convention | Examples |
|----------|------------|----------|
| **Source files** | `kebab-case.js` | `scrape.js`, `utils.js`, `test1.js` |
| **Config files** | Dotted-prefix | `.github/`, `.vscode/`, `.editorconfig`, `.gitignore` |
| **Docs (root level)** | `UPPER_SNAKE_CASE.md` | `README.md`, `AGENTS.md`, `SECURITY.md` |
| **Docs (nested)** | `kebab-case.md` | `code-docs/scrape.md`, `selenium_webdriver_architecture.md` |
| **CI/CD files** | `.github/workflows/*.yml` | `ci.yml` |

---

## File Placement Patterns

| Pattern | Path | Purpose |
|---------|------|---------|
| **Source code** | `src/*.js` | All executable scripts and modules |
| **Documentation** | `docs/` | Architecture, code docs, research |
| **Architecture blueprints** | `docs/Project_Architecture/` | Generated architecture documentation |
| **Config** | Root (`.prettierrc`, `.editorconfig`, etc.) | Project-wide tooling configuration |
| **CI/CD** | `.github/workflows/` | GitHub Actions pipelines |
| **Editor config** | `.vscode/` | VS Code workspace settings |
| **Dependencies** | `node_modules/` (gitignored), `package.json` + `bun.lock` | Runtime and dev dependencies |

---

## Auto-Detection Indicators

| Indicator | Present | Notes |
|-----------|---------|-------|
| `package.json` | ✅ | ES modules, `type: "module"` |
| `bun.lock` | ✅ | Bun package manager compatibility |
| `src/` directory | ✅ | 5 source files |
| `node_modules/` | ✅ (gitignored) | |
| CI config | ✅ | `.github/workflows/ci.yml` |
| Comprehensive docs | ✅ | 10+ documentation files |
| Editor config | ✅ | `.vscode/` workspace, `.editorconfig` |

---

## Key Folder Descriptions

### `src/` — Source Code

| File | Lines | Purpose |
|------|-------|---------|
| `scrape.js` | 429 | **Primary entry point.** Full scraper: paginates 20 pages, extracts comic metadata + up to 3 chapters per comic, writes `comics.json` and `chapters.json`. Uses Chrome temp profiles. |
| `utils.js` | 210 | **Shared utility library.** Retry wrappers for all Selenium DOM interactions: `clickElement`, `textElement`, `imageElement`, `hrefElement`, `performGet`, `safeClick`. |
| `scrape2.js` | 122 | Simplified scraper variant. Paginates with explicit waits but fewer features (no chapter deep-dive). |
| `test.js` | 155 | Alternative scraper using `getBinaryPaths()` from Selenium Manager. Uses manual retry loop. |
| `test1.js` | 31 | Selenium smoke test against `selenium.dev/web/web-form.html` — validates basic WebDriver setup. |

### `docs/Project_Architecture/` — Blueprint Documents

| File | Content |
|------|---------|
| `selenium_webdriver_architecture.md` | Architecture diagram, C4 context, sequence diagram, data flow, error handling |
| `selenium_webdriver_folders.md` | **This file** — directory tree, naming conventions, file descriptions |
| `selenium_webdriver_techstack.md` | Technology stack, version info, dependency analysis |
| `Workflow_Analysis.md` | Detailed scraping workflows with sequence diagrams |
| `Project_Architecture_Blueprint.md` | Original architecture overview |
| `Project_Folder_Structure.md` | Original folder structure overview |
| `Technology_Stack_Blueprint.md` | Original tech stack overview |
| `exemplars.md` | Code pattern exemplars |

### `.vscode/` — Workspace Configuration

| File | Purpose |
|------|---------|
| `extensions.json` | Recommended VS Code extensions |
| `launch.json` | Debug configurations for the scraper scripts |
| `settings.json` | Workspace settings (formatting, linting) |
| `tasks.json` | Build/test task automation |

---

## Configuration Files

| File | Role |
|------|------|
| `package.json` | Dependencies (`selenium-webdriver@4.34.0`, `assert@2.1.0`), scripts (`test`, `format`, `format:check`) |
| `bun.lock` | Lockfile for Bun package manager compatibility |
| `.prettierrc` | Prettier formatting config |
| `.editorconfig` | Cross-editor indentation and line-ending settings |
| `.env.example` | Template for environment variables |
| `.dockerignore` | Docker build exclusion rules |
| `.eslintignore` | ESLint exclusion rules |
| `.gitignore` | VCS exclusion rules (node_modules, output JSON, chrome-profile) |

---

## Documentation Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | AI agent context — architecture summary, commands, conventions |
| `README.md` | Project overview and quick-start |
| `SETUP_GUIDE.md` | Detailed setup instructions |
| `DEVELOPMENT_GUIDE.md` | Developer workflow documentation |
| `TESTING_GUIDE.md` | Testing instructions |
| `DEPLOYMENT_GUIDE.md` | Deployment notes |
| `API_REFERENCE.md` | API reference documentation |
| `ARCHITECTURE.md` | Architecture overview |
| `DATABASE_SCHEMA.md` | Database schema notes |
| `SECURITY.md` | Security policy and guidelines |
| `CONTRIBUTING.md` | Contribution guidelines |
| `RESEARCH_REPORT.md` | Selenium 4/BiDi/Playwright research |
| `THE_STORY_OF_THIS_REPO.md` | Repository history and narrative |

---

*Generated by folder-structure-blueprint-generator — comprehensive analysis*
