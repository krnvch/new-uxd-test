# Release Notes

## v0.3.0 — Dark Mode

Dark mode as the default theme, with a toggle to switch between light and dark.

### New

- **Dark mode** — ships as the default; all surfaces, rows, and controls adapt to the dark palette
- **Theme toggle** — Sun/Moon icon button in the header switches between light and dark
- **Theme persistence** — choice saved to `localStorage` and restored on reload with no flash (FOUC-prevention script)
- **13 app-specific CSS variables** — `app-bg`, `app-sidebar`, `app-heading`, `row-selected`, `row-hover`, `bulk-bar-*`, `status-done`, `status-progress` defined in `:root` / `.dark` and registered in `@theme inline`
- **`useTheme` hook + `ThemeProvider`** — lightweight context (no extra packages) supporting `light`, `dark`, and `system` modes

### Changed

- Replaced all hardcoded color classes (`bg-gray-50`, `bg-white`, `text-gray-900`, `bg-[#1d293d]`, `bg-[#ff441c]`, `text-[#8ec5ff]`, etc.) with CSS-variable-based Tailwind utilities
- Replaced non-functional Settings gear button with the theme toggle
- Status dot colors (`bg-green-500` / `bg-yellow-500`) now use `bg-status-done` / `bg-status-progress` tokens

### Files added

- `src/hooks/use-theme.ts` — ThemeProvider + useTheme hook
- `src/components/ThemeToggle.tsx` — Sun/Moon toggle button

---

## v0.2.0 — Table Rebuild with TanStack + shadcn/ui

Complete rebuild of the document table to match the Figma "Blocks / Dashboard-01" design using production-grade libraries.

### New

- **TanStack Table** — sorting, pagination, row selection, and column visibility powered by `@tanstack/react-table`
- **Tabs** — Outline, Past Performance (3), Key Personnel (2), Focus Documents
- **Pagination** — 10/20/30/50 rows per page, page navigation (Page 1 of 7)
- **Column visibility** — "Customize Columns" dropdown to toggle columns on/off
- **"+ Add Section" button** in toolbar
- **Status indicators** — green dot (Done) / yellow dot (In Process)
- **Reviewer column** — shows assigned name or "Assign reviewer" dropdown
- **Actions menu** — three-dot menu per row (View details, Edit, Delete)
- **Drag handles** — grip icon per row for future drag-and-drop
- **68 mock document rows** matching Figma data (Cover Page, Table of Contents, Executive summary, Technical approach, etc.)
- **Playwright MCP** configured for automated UI verification after changes
- **CLAUDE.md** — project documentation for AI-assisted development

### Changed

- Replaced hand-rolled sorting/resizing with TanStack Table built-in models
- Replaced security attack data model (`AttackData`) with document data model (`DocumentRow`)
- Migrated from custom CSS (`ObjectTable.css`) to Tailwind utility classes only
- All table headers now use consistent `SortableHeader` component

### Tech Stack

- React 19 + TypeScript 5.9
- Vite 7 + Tailwind CSS v4
- shadcn/ui (new-york style): table, button, checkbox, dropdown-menu, tabs, select, badge, tooltip
- TanStack React Table
- Playwright MCP for UI testing

---

## v0.1.0 — Initial Object Table

### New

- Object table with security attack data (8 rows)
- Column sorting (asc/desc/none) with sort icons
- Column resizing via drag handles
- Row selection with checkboxes (individual + select all)
- Bulk actions bar with selection count, Select all, Clear
- Hover actions on rows (toggle, three-dot menu)
- Sidebar placeholder + main content layout
- shadcn/ui components: table, button, checkbox, badge, dropdown-menu
