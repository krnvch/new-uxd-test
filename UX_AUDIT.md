# UX Usability Audit Report

**Project:** Object Table Dashboard
**Date:** 2026-02-06
**Method:** Automated Playwright testing + code analysis + visual review
**Scope:** Full application at `http://localhost:5173/new-uxd-test/`

---

## Summary

| Category | Score (1-5) | Critical | Major | Minor | Enhancement |
|----------|:-----------:|:--------:|:-----:|:-----:|:-----------:|
| Accessibility | 3 | 1 | 1 | 1 | 1 |
| Visual Design | 3 | 0 | 2 | 3 | 2 |
| Interaction Design | 4 | 0 | 1 | 2 | 2 |
| Responsiveness | 2 | 1 | 1 | 0 | 1 |
| Design System Consistency | 2 | 0 | 3 | 4 | 2 |
| Information Architecture | 4 | 0 | 0 | 2 | 1 |
| **Total** | **3.0** | **2** | **8** | **12** | **9** |

**Overall: 31 findings** (2 critical, 8 major, 12 minor, 9 enhancements)

---

## Critical Issues

### [Critical] C1 — Checkbox touch targets are 16x16px

**Location:** All row checkboxes and "Select all" checkbox
**Issue:** Checkbox elements render at 16x16px, below the WCAG 2.5.8 minimum of 24x24px for desktop.
**Impact:** Users with motor impairments or on touch devices will struggle to tap checkboxes accurately. On mobile the problem is severe — minimum touch target should be 44x44px.
**Fix:** Increase the clickable area of checkboxes. Either enlarge the checkbox component to `size-6` (24px) or add invisible padding to the click target:
```tsx
// In checkbox.tsx or via wrapper
<div className="flex items-center justify-center size-8 -m-2">
  <Checkbox ... />
</div>
```
**Reference:** WCAG 2.5.8 Target Size (Minimum), Apple HIG 44pt minimum

---

### [Critical] C2 — Table is unusable on mobile (375px)

**Location:** Entire table on mobile viewport
**Issue:** Table content is 844px wide. On mobile (375px), more than half the table is hidden. Reviewer, Actions, Limit, Target columns are completely cut off. Pagination and footer are also clipped. The bulk bar overflows the viewport.
**Impact:** Mobile users cannot see or interact with most table data.
**Fix:** Implement a responsive strategy:
- **Option A (quick):** Add a visible horizontal scroll indicator and ensure the table container scrolls smoothly with `-webkit-overflow-scrolling: touch`
- **Option B (better):** Switch to a card-based layout on screens below 768px, showing key fields (Header, Status, Reviewer) as stacked cards
- **Option C (best):** Implement a responsive table that pins the first column (Header) and lets remaining columns scroll horizontally
**Reference:** Responsive Data Tables (CSS-Tricks), Material Design Data Tables

---

## Major Issues

### [Major] M1 — No meaningful empty states for tabs

**Location:** Past Performance, Key Personnel, Focus Documents tabs
**Issue:** Inactive tabs show only plain gray text like "Past Performance content" centered in empty white space. No visual hierarchy, no guidance, no call-to-action.
**Impact:** Users who click these tabs get no indication of what the tab is for, whether data is loading, or what action to take. Feels broken.
**Fix:** Design proper empty states with:
- An illustration or icon
- A short heading explaining the tab
- A description or CTA (e.g., "No past performance records yet. Add your first record.")
**Reference:** Material Design Empty States, Atlassian Empty State Pattern

---

### [Major] M2 — Hardcoded colors bypass the design system

**Location:** `ObjectTable.tsx` (15+ instances), `columns.tsx` (2 instances)
**Issue:** The codebase uses a mix of design tokens (`bg-muted`, `text-foreground`) and hardcoded Tailwind colors (`bg-gray-50`, `text-gray-900`, `bg-blue-50`). The bulk bar uses fully arbitrary values (`bg-[#1d293d]`, `text-[#8ec5ff]`, `bg-[#ff441c]`).
**Impact:** Dark mode will break. Theme changes won't propagate. Inconsistent visual language.
**Fix:** Replace all hardcoded colors with semantic tokens:

| Current | Replace with |
|---------|-------------|
| `bg-gray-50` | `bg-muted` or `bg-background` |
| `text-gray-900` | `text-foreground` |
| `text-gray-500` / `hover:text-gray-700` | `text-muted-foreground` / `hover:text-foreground` |
| `border-gray-200` | `border-border` |
| `bg-blue-50` / `hover:bg-blue-100` | `bg-accent` / `hover:bg-accent/80` |
| `hover:bg-gray-50` | `hover:bg-muted/50` |
| `bg-[#1d293d]` | Define `--bulk-bar` CSS variable |
| `text-[#8ec5ff]` | Define `--bulk-bar-link` CSS variable |
| `bg-[#ff441c]` | Use `variant="destructive"` on Button |
| `bg-green-500` / `bg-yellow-500` | Define `--status-done` / `--status-in-progress` tokens |

---

### [Major] M3 — Bulk bar uses native `<button>` instead of shadcn Button

**Location:** `ObjectTable.tsx` lines 187-199 — "Select all" and "Clear" links
**Issue:** Two interactive elements in the bulk bar use raw `<button>` elements with custom CSS classes instead of the shadcn Button component. They lack proper focus states, consistent styling, and ARIA attributes.
**Impact:** Keyboard users may not see focus indicators. Screen readers get generic "button" without context.
**Fix:** Replace with:
```tsx
<Button variant="link" size="sm" className="text-[--bulk-bar-link] p-0 h-auto" onClick={selectAll}>
  Select all
</Button>
```

---

### [Major] M4 — Destructive button uses hardcoded colors instead of variant

**Location:** `ObjectTable.tsx` line 219 — red button in bulk bar
**Issue:** `className="bg-[#ff441c] hover:bg-[#e63d19]"` instead of `variant="destructive"`.
**Impact:** Breaks design system consistency. Won't adapt to theme changes.
**Fix:** Use `<Button variant="destructive">` and override only if the destructive token doesn't match the design.

---

### [Major] M5 — Table tablet view (768px) clips content

**Location:** Table on iPad / tablet viewport
**Issue:** Table content (844px) overflows the container (648px available). Reviewer column and actions are clipped. No visual indication that more content exists to the right.
**Impact:** Tablet users miss important columns without realizing they can scroll.
**Fix:** Add scroll shadow indicators on the table container edges to signal scrollable content:
```css
.table-container {
  background:
    linear-gradient(to right, white 30%, transparent),
    linear-gradient(to left, white 30%, transparent),
    linear-gradient(to right, rgba(0,0,0,0.1), transparent 15px),
    linear-gradient(to left, rgba(0,0,0,0.1), transparent 15px);
  background-size: 40px 100%, 40px 100%, 15px 100%, 15px 100%;
  background-attachment: local, local, scroll, scroll;
}
```

---

### [Major] M6 — No loading states

**Location:** Entire application
**Issue:** There are no loading states, skeleton screens, or spinners anywhere. When data loads (or will load from an API in the future), users see a blank screen or flash of empty content.
**Impact:** Users can't tell if the app is working or broken during data fetches.
**Fix:** Add skeleton rows to the table body:
```tsx
// Show while loading
{Array.from({ length: 10 }).map((_, i) => (
  <TableRow key={i}>
    <TableCell><Skeleton className="h-4 w-4" /></TableCell>
    <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
    ...
  </TableRow>
))}
```
**Reference:** shadcn/ui Skeleton component, Nielsen: Visibility of System Status

---

### [Major] M7 — Status dots use color as the only differentiator

**Location:** Status column — green dot (Done), yellow dot (In Process)
**Issue:** Status is communicated solely through color (green vs yellow dots). Users with color vision deficiency (8% of males) cannot distinguish between statuses.
**Impact:** Colorblind users cannot determine document status.
**Fix:** Add a secondary differentiator — the text label is already present ("Done" / "In Process") which helps, but the dots themselves should also differ. Options:
- Use different shapes (checkmark icon for Done, clock icon for In Process)
- Add a pattern or border difference to the dots
- Use icons from lucide: `<CheckCircle2>` for Done, `<Clock>` for In Process

---

### [Major] M8 — "Assign reviewer" dropdown has no feedback after selection

**Location:** Reviewer column, unassigned rows
**Issue:** The "Assign reviewer" Select dropdown doesn't update the row data when a reviewer is selected. The dropdown fires but the state doesn't change — the component is uncontrolled with no `onValueChange` handler.
**Impact:** Users try to assign a reviewer but nothing happens. Silent failure.
**Fix:** Add state management for reviewer assignment, or at minimum show a toast/feedback when a reviewer is selected.

---

## Minor Issues

### [Minor] m1 — Heading hierarchy incomplete

**Location:** Page structure
**Issue:** Only one `<h1>` ("Object table") exists. No `<h2>` or `<h3>` for sections like the tab content areas.
**Impact:** Screen reader users navigating by headings can't jump to table sections.
**Fix:** Add visually hidden `<h2>` headings for each tab panel content area.

---

### [Minor] m2 — Sidebar is a non-semantic empty div

**Location:** `ObjectTable.tsx` line 76 — `<aside>` tag
**Issue:** The sidebar is an empty `<aside>` element with no content, navigation, or ARIA label. It's purely decorative but uses a semantic landmark.
**Impact:** Screen readers announce an empty "complementary" landmark, which is confusing.
**Fix:** Either add `aria-hidden="true"` to hide it from screen readers, or replace `<aside>` with a plain `<div>` since it has no functional content.

---

### [Minor] m3 — "0 of 68 row(s) selected" shows when nothing is selected

**Location:** Pagination footer, left side
**Issue:** "0 of 68 row(s) selected." always displays, even when no selection has been made. This is visual noise that provides no value.
**Impact:** Low-severity, but clutters the UI. Users may wonder why selection count is always visible.
**Fix:** Only show this text when at least 1 row is selected. When 0 selected, show nothing or show total row count instead ("68 rows").

---

### [Minor] m4 — Settings gear icon has no tooltip or action

**Location:** Top-right header, Settings icon button
**Issue:** The gear icon button has no tooltip, no click handler, and no dropdown. It's a dead button.
**Impact:** Users click it expecting settings and nothing happens.
**Fix:** Either implement a settings dropdown or remove the button until functionality is ready.

---

### [Minor] m5 — Column widths are hardcoded pixels in JS

**Location:** `columns.tsx` — all `size:` properties
**Issue:** Column widths (40, 80, 130, 160, 180, 220) are arbitrary pixel values in JavaScript, not following any design token or spacing scale.
**Impact:** Maintenance burden; no consistency guarantee across breakpoints.
**Fix:** Define column width constants or use proportional widths that can adapt to container size.

---

### [Minor] m6 — Tab badge counts are hardcoded

**Location:** `ObjectTable.tsx` lines 96-104
**Issue:** "Past Performance (3)" and "Key Personnel (2)" counts are hardcoded strings, not derived from data.
**Impact:** Counts will be stale if/when real data is connected.
**Fix:** Derive counts from actual data or pass as props.

---

### [Minor] m7 — Bulk bar button labels say "Button"

**Location:** `ObjectTable.tsx` lines 202-224
**Issue:** Three buttons in the bulk bar are labeled "Button" — these are placeholder labels that were never updated.
**Impact:** Users don't know what these buttons do.
**Fix:** Replace with meaningful labels (e.g., "Change Status", "Assign Reviewer", "Delete Selected").

---

### [Minor] m8 — Inconsistent shadow usage

**Location:** Table card uses `shadow-sm`, bulk bar uses `shadow-lg`
**Issue:** Two different shadow levels without clear elevation hierarchy.
**Impact:** No consistent visual depth system.
**Fix:** Define an elevation scale and use it consistently (e.g., card=`shadow-sm`, floating bar=`shadow-xl`, dropdown=`shadow-md`).

---

### [Minor] m9 — Mixed spacing scale in bulk bar

**Location:** `ObjectTable.tsx` line 183-200
**Issue:** The bulk bar mixes `gap-10` (40px), `p-2` (8px), `gap-0.5` (2px), `px-2` (8px), `mr-2.5` (10px). These values don't follow a consistent 4/8/12/16/24 scale.
**Impact:** Inconsistent visual rhythm.
**Fix:** Standardize to multiples of 4: replace `gap-10` with `gap-8`, `mr-2.5` with `mr-3`.

---

### [Minor] m10 — Sort icon opacity is arbitrary

**Location:** `columns.tsx` line 43 — `opacity-30` on unsorted columns
**Issue:** `opacity-30` is not a standard Tailwind opacity value for muted elements. Design system uses `text-muted-foreground` for reduced emphasis.
**Impact:** Inconsistency in how "inactive" state is communicated.
**Fix:** Use `text-muted-foreground` instead of opacity for the unsorted icon.

---

### [Minor] m11 — "Assign reviewer" border style differs from other cells

**Location:** Reviewer column, unassigned rows
**Issue:** The "Assign reviewer" dropdown uses `border-dashed`, while no other element in the table uses dashed borders. This creates a visual inconsistency.
**Impact:** Low — the dashed border does communicate "incomplete/needs attention" but breaks visual uniformity.
**Fix:** Consider using a solid border with muted color, or a ghost-style trigger consistent with other table elements.

---

### [Minor] m12 — Drag handles are non-functional

**Location:** First column — GripVertical icons
**Issue:** Drag handles render on every row but drag-and-drop is not implemented. They are visual-only.
**Impact:** Users expect to be able to drag rows but nothing happens.
**Fix:** Either implement drag-and-drop (via `@dnd-kit/sortable`) or remove the drag handles until the feature is ready.

---

## Enhancements

### [Enhancement] E1 — Add keyboard shortcuts

**Suggestion:** Add shortcuts for power users:
- `Ctrl+A` / `Cmd+A` — Select all rows
- `Escape` — Clear selection / close bulk bar
- `←` / `→` — Navigate pages
- `/` — Focus search (when search is added)
**Reference:** Linear, Notion keyboard shortcut patterns

---

### [Enhancement] E2 — Add row click to expand/detail

**Suggestion:** Clicking a row (not the checkbox) could expand it to show more details or navigate to a detail view. Currently rows are only interactive via checkboxes and action menus.
**Reference:** Master-detail pattern, Figma design inspector

---

### [Enhancement] E3 — Add search/filter to table

**Suggestion:** No way to search or filter the 68 rows. A search input above the table would greatly improve findability.
**Reference:** shadcn/ui Input component + TanStack Table `getFilteredRowModel`

---

### [Enhancement] E4 — Add column resizing

**Suggestion:** The previous implementation had column resizing. It was removed during the TanStack migration. Consider re-adding via TanStack's built-in column resizing API.
**Reference:** TanStack Table Column Resizing docs

---

### [Enhancement] E5 — Add multi-sort indicator

**Suggestion:** Users can only sort by one column. Multi-column sort (shift+click) would be useful for power users working with 68 rows.
**Reference:** TanStack Table supports `enableMultiSort`

---

### [Enhancement] E6 — Progress bar for Target vs Limit

**Suggestion:** Target and Limit columns show raw numbers. A small progress bar (Target/Limit ratio) would make the relationship instantly visual.
```
Target: 15  Limit: 30  [████████░░░░░░░░] 50%
```

---

### [Enhancement] E7 — Sticky table header on scroll

**Suggestion:** When the table has more than 10 rows per page or on smaller screens, the header scrolls out of view. A sticky header would maintain context.
**Fix:** Add `sticky top-0 z-10` to `TableHeader`.

---

### [Enhancement] E8 — Batch reviewer assignment from bulk bar

**Suggestion:** When multiple rows are selected, the bulk bar should offer "Assign Reviewer" as a bulk action rather than requiring individual assignment per row.

---

### [Enhancement] E9 — Add "Select visible" vs "Select all" clarity

**Suggestion:** The header checkbox selects all rows on the current page. The bulk bar "Select all" selects all 68 rows. This distinction is not communicated clearly. Add a banner like: "All 10 rows on this page are selected. Select all 68 rows?"
**Reference:** Gmail, Google Drive selection pattern

---

## Prioritized Improvement Roadmap

### Immediate (This Sprint)
1. **C1** — Fix checkbox touch targets (30 min)
2. **M7** — Fix status color-only differentiation — add icons (30 min)
3. **M2** — Replace hardcoded colors with design tokens (1-2 hours)
4. **m7** — Replace "Button" placeholder labels (10 min)
5. **m2** — Fix sidebar semantics (5 min)
6. **m3** — Hide "0 selected" text when empty (10 min)

### Short-Term (Next Sprint)
7. **C2** — Mobile responsive strategy (4-6 hours)
8. **M5** — Tablet scroll indicators (1 hour)
9. **M1** — Design empty states for tabs (2-3 hours)
10. **M3 + M4** — Fix bulk bar button components (30 min)
11. **M8** — Wire up reviewer assignment state (1-2 hours)
12. **E7** — Sticky table header (15 min)

### Medium-Term (Backlog)
13. **M6** — Loading/skeleton states (2-3 hours)
14. **E3** — Search/filter (2-3 hours)
15. **E1** — Keyboard shortcuts (2-3 hours)
16. **E6** — Target/Limit progress bar (1-2 hours)
17. **E4** — Column resizing (2-3 hours)
18. **E9** — "Select all" clarity pattern (1 hour)
