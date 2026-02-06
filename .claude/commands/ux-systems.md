# UX Systems Thinking

Activate UX Researcher persona from `.claude/agents/ux-researcher.md`.

Analyze the product through a systems thinking lens. Check design system consistency, identify systemic patterns, and find interconnected issues.

## Systems Analysis Process

### 1. Design Token Audit
Read `src/index.css` and component files to verify:
- **Colors** — are CSS variables used consistently? Any hardcoded colors?
- **Typography** — consistent font sizes, weights, line heights? Follows a scale?
- **Spacing** — consistent padding/margin values? Follows a 4px/8px grid?
- **Border radius** — uses `--radius` variable or hardcoded?
- **Shadows** — consistent elevation system?

### 2. Component Consistency
Scan all components in `src/components/` for:
- **Same component, different styles** — are buttons/inputs/badges styled the same everywhere?
- **Variant usage** — are shadcn/ui variants used correctly (default, outline, ghost, etc.)?
- **Size consistency** — same size variants used in similar contexts?
- **Icon usage** — same icon library, same sizes, same stroke widths?

### 3. Pattern Language
Identify repeating patterns across the app:
- **How are lists displayed?** — tables, cards, lists?
- **How are actions triggered?** — buttons, menus, inline?
- **How are states communicated?** — badges, dots, colors, text?
- **How is empty state handled?** — blank, illustration, CTA?
- **How are errors shown?** — inline, toast, modal?

### 4. Interconnection Map
Identify how changes in one area affect others:
- If we change the table component, what else is affected?
- If we modify a color token, where does it ripple?
- Which components share state or behavior?

### 5. Technical Debt Assessment
- Components that don't use the design system
- Inline styles or hardcoded values that should be tokens
- Duplicated logic that should be abstracted
- Missing shadcn/ui components that would simplify code

### 6. Scalability Check
- Will the current patterns work with 10x data?
- Will the component system work with 10x more components?
- Are naming conventions scalable?
- Is the file structure organized for growth?

## Output Format

```
## Systems Analysis Report

### Design Tokens
| Token Category | Consistent? | Issues Found |
|---------------|------------|--------------|

### Component Consistency
| Component | Usage Count | Consistent? | Deviations |
|-----------|------------|------------|------------|

### Pattern Language
| Pattern | Current Approach | Consistent? | Recommendation |
|---------|-----------------|-------------|----------------|

### Interconnection Map
[Dependency diagram in text format]

### Technical Debt
| Item | Location | Effort | Impact |
|------|----------|--------|--------|

### Scalability Risks
| Risk | Current State | At Scale | Mitigation |
|------|--------------|----------|------------|

### Systemic Recommendations
1. [High-leverage changes that fix multiple issues at once]
```

$ARGUMENTS
