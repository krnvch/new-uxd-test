# UX Discovery

Activate UX Researcher persona from `.claude/agents/ux-researcher.md`.

Analyze the current product/feature to discover user flows, pain points, and opportunities. Use Playwright MCP to navigate the running app and build a complete picture.

## Discovery Process

### 1. Current State Mapping
Navigate the app and document:
- **All user flows** — what can a user do? Map every path
- **Entry points** — where does the user start?
- **Decision points** — where does the user choose?
- **Exit points** — where does the user finish or leave?
- **Dead ends** — where does the flow break or lead nowhere?

### 2. User Flow Analysis
For each identified flow:
- Number of steps to complete the task
- Cognitive load at each step (how many decisions?)
- Points of friction (confusion, extra clicks, unclear feedback)
- Happy path vs. edge cases

### 3. Pain Point Identification
Categorize discovered issues:
- **Friction** — things that slow the user down
- **Confusion** — things that make the user think
- **Missing feedback** — actions without clear results
- **Missing features** — obvious gaps in functionality
- **Inconsistency** — similar things that work differently

### 4. Opportunity Mapping
For each pain point, identify:
- **Quick wins** — easy fixes, high impact
- **Medium effort** — worth doing in next sprint
- **Strategic** — requires planning but unlocks significant value

### 5. Information Architecture Review
- Is the content organized logically?
- Can users find what they need?
- Are labels clear and consistent?
- Is the navigation predictable?

### 6. Jobs-to-be-Done Analysis
Identify the core jobs users are trying to accomplish:
- **Main job** — the primary reason the user is here
- **Related jobs** — secondary tasks they'll need to do
- **Emotional jobs** — how the user wants to feel (confident, in control, etc.)

## Output Format

```
## Discovery Report: [Feature/Page]

### User Flows
[Flow diagrams in text format]
1. User opens page → sees table → sorts by column → selects rows → performs bulk action

### Pain Points
| # | Pain Point | Severity | Flow Step | Category |
|---|-----------|----------|-----------|----------|

### Opportunities
| # | Opportunity | Effort | Impact | Priority |
|---|------------|--------|--------|----------|

### JTBD
| Job Type | Job Statement |
|----------|--------------|

### Recommended Next Steps
1. [Immediate action]
2. [Short-term improvement]
3. [Long-term vision]
```

$ARGUMENTS
