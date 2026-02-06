---
name: plan-mode-banking
description: Orchestrates context gathering and architecture planning for banking features. Triggers automatically in Plan Mode when discussing new features, architecture decisions, or system design.
---

# Banking Feature Planning

When entering Plan Mode for a new feature, run these agents in parallel to gather context before planning.

## Step 1: Context Gathering (run in parallel)

Launch these 4 agents simultaneously:

### 1. Schema Analyzer
```
Task: Analyze Convex schema for relevant tables
Prompt: "List all tables in convex/schema.ts that relate to [feature]. 
        For each, show: table name, key fields, relationships to other tables."
```

### 2. Component Scanner
```
Task: Find existing UI components
Prompt: "Search components/ for any existing components related to [feature].
        List: file path, what it displays, data sources it uses."
```

### 3. API Surface Mapper
```
Task: Map available Convex functions
Prompt: "List all queries and mutations in convex/ related to [feature].
        Show: function name, parameters, return type."
```

### 4. Pattern Finder
```
Task: Identify existing patterns to follow
Prompt: "Find examples in the codebase of similar features.
        Note: data fetching patterns, component structure, styling approach."
```

## Step 2: Architecture Planning

After context gathering completes, run:

```
Task: banking-architecture-planner
Prompt: "Plan [feature] implementation. Context from previous agents:
        - Schema: [summary]
        - Components: [summary]  
        - APIs: [summary]
        - Patterns: [summary]
        
        Evaluate against banking pillars and output implementation plan."
```

## Output

Combine into a planning document:

```markdown
## [Feature] Implementation Plan

### Context Summary
- **Data model**: [relevant tables/fields]
- **Existing components**: [reusable pieces]
- **Available APIs**: [queries/mutations to use]
- **Patterns to follow**: [established conventions]

### Architecture Assessment
[Output from banking-architecture-planner]

### Implementation Tasks
1. [Task] — [pillar tag]
2. [Task] — [pillar tag]
```
