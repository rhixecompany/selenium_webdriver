# Project Folder Structure Blueprint

## Project: selenium_webdriver — Selenium WebDriver Automation

**Generated:** 2026-06-25  
**Project Type:** Bun/TypeScript Selenium WebDriver Automation  
**Auto-detected:** Yes (Bun/TypeScript — `package.json`, `bun.lock`, `src/`, `node_modules/`)

---

## Directory Tree

```
selenium_webdriver/
├── .github/
│   └── workflows/
├── .vscode/
├── AGENTS.md
├── API_REFERENCE.md
├── ARCHITECTURE.md
├── CONTRIBUTING.md
├── DATABASE_SCHEMA.md
├── DEPLOYMENT_GUIDE.md
├── DEVELOPMENT_GUIDE.md
├── README.md
├── RESEARCH_REPORT.md
├── SECURITY.md
├── SETUP_GUIDE.md
├── TESTING_GUIDE.md
├── bun.lock
├── code-exemplars.md
├── copilot-instructions.md
├── cross-linking-report.md
├── docs/
│   ├── code-docs/
│   └── Project_Architecture/
├── execution-summary.md
├── folder-structure.md
├── node_modules/
├── package.json
├── project-workflow.md
├── src/                       # TypeScript source
├── technology-stack.md
└── validation-report.md
```

---

## Naming Conventions

| Convention | Pattern | Examples |
|---|---|---|
| **Source files** | kebab-case | `src/` (contents) |
| **Config** | dotted-prefix | `.github/`, `.vscode/` |
| **Documentation** | UPPER_CASE.md | `README.md`, `AGENTS.md` |
| **Docs subdirs** | kebab-case | `docs/code-docs/` |

---

## File Placement Patterns

- **Source code**: `src/` directory
- **Documentation**: `docs/` with `code-docs/` subfolder
- **Node dependencies**: `node_modules/`, `package.json`

---

## Project Type Indicators

| Indicator | Value |
|---|---|
| Has `package.json` | ✅ Node.js / Bun project |
| Has `bun.lock` | ✅ Uses Bun package manager |
| Has `src/` | ✅ Source code directory |
| Has comprehensive docs | ✅ Full documentation suite |

---

## Key Architecture Decisions

1. **Bun/TypeScript** based Selenium WebDriver automation.
2. **Comprehensive documentation** — Full suite of project docs despite being automation-focused.
3. **Standard Node project layout** — `src/` for source, `package.json` for dependencies.
4. **Separate code docs** — `docs/code-docs/` for generated API documentation.
