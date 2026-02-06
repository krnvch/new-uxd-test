# UX Universal Solutions

Activate UX Researcher persona from `.claude/agents/ux-researcher.md`.

Generate universal, reusable solutions to UX problems. Solutions should be framework-agnostic in thinking but implementation-specific to our stack (React, shadcn/ui, Tailwind, TanStack Table).

## Solution Design Process

### 1. Problem Decomposition
Break the given problem into atomic parts:
- **What is the core user need?** (not the feature request, the underlying need)
- **What are the constraints?** (technical, design system, accessibility, performance)
- **What's the scope?** (one component, one page, system-wide)
- **Who are the users?** (role, expertise level, context of use)

### 2. Universal Pattern Search
Find patterns that solve the problem regardless of product:
- Is this a known UX pattern? (master-detail, wizard, search-as-you-type, etc.)
- What's the most common solution in established design systems?
- What's the most accessible solution?
- What's the most performant solution?

### 3. Solution Generation (Rule of Three)
Always generate exactly 3 solutions at different complexity levels:

**Solution A — Minimal Viable**
- Simplest implementation
- Uses only existing components
- Fastest to ship
- Trade-offs acknowledged

**Solution B — Balanced**
- Right level of complexity for the problem
- May require new components or patterns
- Best overall UX

**Solution C — Comprehensive**
- Full-featured approach
- Future-proof and scalable
- May require significant effort
- Highest UX quality

### 4. Solution Evaluation Matrix
Rate each solution across:
- **Usability** (1-5) — how intuitive for users?
- **Accessibility** (1-5) — keyboard, screen reader, WCAG compliance?
- **Consistency** (1-5) — fits existing design system?
- **Effort** (1-5) — implementation complexity? (1=easy, 5=hard)
- **Scalability** (1-5) — works as product grows?

### 5. Implementation Blueprint
For the recommended solution, provide:
- Component tree / structure
- State management approach
- Key interactions and their handlers
- Accessibility requirements (ARIA, keyboard)
- Which shadcn/ui components to use or compose
- Edge cases to handle

### 6. Reusability Assessment
- Can this solution become a reusable component?
- What props/API would make it flexible?
- Where else in the product could this pattern apply?

## Output Format

```
## Solution: [Problem Statement]

### Problem
[Core need, constraints, scope]

### Solution A: [Name] — Minimal
[Description, component sketch, trade-offs]

### Solution B: [Name] — Balanced (Recommended)
[Description, component sketch, trade-offs]

### Solution C: [Name] — Comprehensive
[Description, component sketch, trade-offs]

### Evaluation
| Criteria | Solution A | Solution B | Solution C |
|----------|-----------|-----------|-----------|
| Usability | | | |
| Accessibility | | | |
| Consistency | | | |
| Effort | | | |
| Scalability | | | |
| **Total** | | | |

### Implementation Blueprint (Solution B)
[Detailed implementation plan]

### Reusability
[How to make this a universal pattern]
```

$ARGUMENTS
