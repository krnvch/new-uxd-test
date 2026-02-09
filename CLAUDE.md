# CLAUDE.md

## Project Overview

UX design test project — a dashboard with an interactive document table. Built with React + TypeScript + Vite, styled with Tailwind CSS v4 and shadcn/ui components. The table uses TanStack Table for sorting, pagination, row selection, and column visibility.

## Commands

- `npm run dev` — start dev server (Vite)
- `npm run build` — typecheck with `tsc -b` then build with Vite
- `npm run lint` — run ESLint
- `npm run deploy` — build and deploy to GitHub Pages via `gh-pages`

## Tech Stack

- **React 19** + **TypeScript 5.9** (strict mode, `verbatimModuleSyntax` enabled)
- **Vite 7** with `@vitejs/plugin-react` and `@tailwindcss/vite`
- **Tailwind CSS v4** (uses `@import "tailwindcss"` in CSS, not a config file)
- **shadcn/ui** (new-york style, Radix UI primitives, lucide-react icons)
- **TanStack Table** for table state management
- **class-variance-authority** + **tailwind-merge** for component variants

## Project Structure

```
src/
├── App.tsx                  # Root — renders ObjectTable
├── main.tsx                 # Entry point
├── index.css                # Tailwind imports + CSS variables (theme)
├── lib/
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
├── components/
│   ├── ui/                  # shadcn/ui primitives (do not edit manually)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── checkbox.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   └── tooltip.tsx
│   └── ObjectTable/         # Main feature
│       ├── ObjectTable.tsx   # Main component (TanStack Table + Tabs + bulk bar)
│       ├── columns.tsx       # Column definitions (ColumnDef<DocumentRow>[])
│       ├── data.ts           # DocumentRow interface + 68 mock rows
│       ├── DataTableToolbar.tsx    # Column visibility toggle + Add Section button
│       └── DataTablePagination.tsx # Rows per page + page navigation
```

## Key Conventions

- **Path alias:** `@/` maps to `./src/` (configured in tsconfig.json and vite.config.ts)
- **Type imports:** always use `import type { ... }` for type-only imports (`verbatimModuleSyntax` is on)
- **shadcn/ui components:** live in `src/components/ui/`, added via `npx shadcn@latest add <component>`. Don't edit these by hand — re-add them if updates are needed
- **shadcn config:** `components.json` at root (new-york style, lucide icons, CSS variables enabled)
- **Base path:** Vite `base: '/new-uxd-test/'` for GitHub Pages deployment
- **No CSS modules/files:** all styling via Tailwind utility classes. The old `ObjectTable.css` was removed

## TypeScript Strictness

The tsconfig has these strict settings — code must comply:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `verbatimModuleSyntax: true` — **use `import type` for types**
- `erasableSyntaxOnly: true`

## UX Researcher Agent

A built-in UX Researcher agent with 5 skill commands. Persona defined in `.claude/agents/ux-researcher.md`.

| Command | Skill | What it does |
|---------|-------|-------------|
| `/ux-audit` | Audit | Heuristic evaluation, visual/interaction/accessibility audit via Playwright |
| `/ux-research` | Research | Competitive analysis, best practices, pattern research |
| `/ux-discovery` | Discovery | User flow mapping, pain points, JTBD, opportunity identification |
| `/ux-systems` | Systems Thinking | Design token audit, component consistency, pattern language, scalability |
| `/ux-solutions` | Universal Solutions | Rule of Three solutions (minimal/balanced/comprehensive) with evaluation matrix |

All commands accept optional arguments for scoping, e.g. `/ux-audit pagination component` or `/ux-research table sorting patterns`.

## shadcn Compliance Agent

A design system compliance checker. Persona in `.claude/agents/shadcn-compliance.md`.

| Command | What it does |
|---------|-------------|
| `/shadcn-check` | Component usage, design tokens, pattern compliance, visual verification, anti-patterns, config |

Accepts optional scope: `/shadcn-check ObjectTable` or `/shadcn-check buttons`.

## Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

This reads `components.json` and places files in `src/components/ui/`.

## UI Verification with Playwright MCP (MANDATORY)

**After completing any UI task** (new component, styling change, layout fix, etc.), you MUST verify the result visually using the Playwright MCP server.

### Workflow

1. Make sure the dev server is running (`npm run dev` — runs on `http://localhost:5173/new-uxd-test/`)
2. Use the Playwright MCP tools to:
   - **Navigate** to the page (`browser_navigate` to `http://localhost:5173/new-uxd-test/`)
   - **Take a snapshot** (`browser_snapshot`) to inspect the accessibility tree and verify elements are present
   - **Click/interact** with UI elements to verify interactivity (sorting, pagination, selection, dropdowns)
   - **Screenshot** (`browser_screenshot`) if visual verification is needed
3. Report findings to the user — what looks correct and what doesn't

### When to run

- After creating or modifying any component
- After changing styles or layout
- After adding new shadcn/ui components
- After fixing any visual bug
- Before marking a UI task as complete

### Available Playwright MCP tools

| Tool | Purpose |
|------|---------|
| `browser_navigate` | Open a URL in the browser |
| `browser_snapshot` | Get accessibility tree of the current page |
| `browser_screenshot` | Take a screenshot of the current page |
| `browser_click` | Click an element (by text, role, or ref) |
| `browser_type` | Type text into an input |
| `browser_select_option` | Select from a dropdown |
| `browser_hover` | Hover over an element |
| `browser_go_back` / `browser_go_forward` | Navigation |
| `browser_wait` | Wait for a condition |
| `browser_close` | Close the browser |

### Example verification sequence

```
1. browser_navigate → http://localhost:5173/new-uxd-test/
2. browser_snapshot → verify table renders, tabs are present, rows show data
3. browser_click → click a column header to test sorting
4. browser_snapshot → verify sort order changed
5. browser_click → click pagination next button
6. browser_snapshot → verify page 2 content
```

### MCP Configuration

The Playwright MCP server is configured in `.mcp.json`:
```json
{
  "playwright": {
    "command": "npx",
    "args": ["@playwright/mcp@latest"]
  }
}
```
