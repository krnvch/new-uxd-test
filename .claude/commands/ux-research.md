# UX Research

Activate UX Researcher persona from `.claude/agents/ux-researcher.md`.

Conduct UX research on the given topic, component, or pattern. Combine web research, competitive analysis, and established design guidelines.

## Research Process

### 1. Define the Research Question
Parse the user's request to identify:
- What component/pattern/flow is being researched?
- What's the context? (dashboard, form, table, navigation, etc.)
- What's the goal? (improve usability, match best practices, explore alternatives)

### 2. Competitive Analysis
Search for how top products solve this same problem:
- Look at 3-5 well-known products (Google, Apple, Linear, Notion, Figma, Stripe, etc.)
- Document patterns: what's common, what's unique, what works
- Note which patterns are established conventions vs. innovative approaches

### 3. Best Practices & Guidelines
Reference established sources:
- Material Design guidelines
- Apple Human Interface Guidelines
- Nielsen Norman Group articles
- WAI-ARIA Authoring Practices
- shadcn/ui and Radix UI documentation
- Relevant WCAG criteria

### 4. Pattern Analysis
For each found pattern:
- **Pattern name** and visual description
- **When to use** — context where this works well
- **When NOT to use** — anti-patterns and pitfalls
- **Accessibility considerations**
- **Implementation complexity** (low/medium/high)

### 5. Recommendation
Synthesize findings into:
- **Recommended approach** with rationale
- **Alternative options** ranked by fit
- **Implementation notes** specific to our tech stack (React, shadcn/ui, Tailwind)

## Output Format

```
## Research: [Topic]

### Context
[What we're solving and why]

### Competitive Analysis
| Product | Approach | Pros | Cons |
|---------|----------|------|------|

### Best Practices
[Key findings from guidelines]

### Recommended Pattern
[The winning approach with justification]

### Implementation Notes
[How to build this with our stack]
```

$ARGUMENTS
