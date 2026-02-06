# UX Audit

Activate UX Researcher persona from `.claude/agents/ux-researcher.md`.

Perform a comprehensive UX audit of the current implementation. Use Playwright MCP to navigate the running app (start `npm run dev` if needed) and take snapshots/screenshots.

## Audit Checklist

### 1. Heuristic Evaluation (Nielsen's 10)
- **Visibility of system status** — does the UI show what's happening? (loading, selection count, current page)
- **Match between system and real world** — are labels and terms user-friendly?
- **User control and freedom** — can users undo, go back, escape?
- **Consistency and standards** — do similar elements behave the same way?
- **Error prevention** — does the UI prevent mistakes before they happen?
- **Recognition over recall** — is everything visible, no hidden features?
- **Flexibility and efficiency** — shortcuts for power users?
- **Aesthetic and minimalist design** — no unnecessary information?
- **Help users recognize and recover from errors** — clear error messages?
- **Help and documentation** — tooltips, hints where needed?

### 2. Visual Design Audit
- Typography hierarchy consistency (sizes, weights, line heights)
- Color usage and contrast ratios (WCAG AA minimum 4.5:1 for text)
- Spacing consistency (does it follow a scale: 4px, 8px, 12px, 16px, 24px?)
- Alignment issues (elements that don't line up)
- Icon consistency (same style, same size, same weight)

### 3. Interaction Design Audit
- Clickable areas meet minimum touch target (44x44px for mobile, 24x24px for desktop)
- Hover/focus/active states on all interactive elements
- Keyboard navigability (Tab order, Enter/Space activation, Escape to close)
- Focus indicators visible
- Transitions and animations purposeful (not decorative)

### 4. Accessibility Audit
- Semantic HTML (proper heading hierarchy, landmarks, lists)
- ARIA attributes where needed (and not where not needed)
- Color not the only means of conveying information
- Screen reader testing via accessibility tree snapshot
- Form labels and error associations

### 5. Responsive & Layout
- Does the layout break at common breakpoints?
- Text overflow/truncation handled gracefully
- Tables scroll horizontally on small screens

## Output Format

For each finding:
```
### [Severity] Finding Title
**Location:** component/element description
**Issue:** what's wrong
**Impact:** why it matters for users
**Fix:** specific recommendation
**Reference:** relevant guideline or pattern
```

End with a summary score table:
| Category | Score (1-5) | Critical | Major | Minor |
|----------|-------------|----------|-------|-------|

$ARGUMENTS
