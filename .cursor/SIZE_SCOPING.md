# Size Scoping for New Directories and Files

This document provides size information for newly added directories and files in `.cursor/` to help reviewers assess the footprint of these additions.

## Directory Sizes (via `du -h`)

```
8.0K	.cursor/commands/
8.0K	.cursor/rules/
8.0K	.cursor/skills/plan-mode-banking/
12K	.cursor/skills/next-cache-components/
24K	.cursor/agents/
24K	.cursor/skills/frontend-design/
40K	.cursor/skills/vercel-composition-patterns/rules
72K	.cursor/skills/vercel-composition-patterns/
124K	.cursor/skills/next-best-practices/
```

**Total size of `.cursor/` directory:** 628K

## Individual File Sizes

### .cursor/agents/
- 1.1K banking-architecture-planner.md
- 1.6K pii-compliance-checker.md
- 1.1K security-scanner.md
- 2.3K test-runner.md
- 665 verifier.md

### .cursor/commands/
- 515 council.md

### .cursor/rules/
- 242 testing-practices.mdc

### .cursor/skills/frontend-design/
- 10K LICENSE.txt
- 4.4K SKILL.md

### .cursor/skills/next-best-practices/
- 1.7K async-patterns.md
- 4.4K bundling.md
- 6.6K data-patterns.md
- 2.9K debug-tricks.md
- 1.5K directives.md
- 4.7K error-handling.md
- 3.4K file-conventions.md
- 5.1K font.md
- 4.3K functions.md
- 1.8K hydration-error.md
- 3.8K image.md
- 7.0K metadata.md
- 7.1K parallel-routes.md
- 3.2K route-handlers.md
- 4.3K rsc-boundaries.md
- 985 runtime-selection.md
- 3.3K scripts.md
- 8.2K self-hosting.md
- 4.0K SKILL.md
- 1.4K suspense-boundaries.md

### .cursor/skills/next-cache-components/
- 7.5K SKILL.md

### .cursor/skills/plan-mode-banking/
- 2.2K SKILL.md

### .cursor/skills/vercel-composition-patterns/
- 23K AGENTS.md
- 2.9K SKILL.md
- 2.3K rules/architecture-avoid-boolean-props.md
- 2.6K rules/architecture-compound-components.md
- 1.9K rules/patterns-children-over-render-props.md
- 2.4K rules/patterns-explicit-variants.md
- 953 rules/react19-no-forwardref.md
- 4.9K rules/state-context-interface.md
- 2.7K rules/state-decouple-implementation.md
- 3.2K rules/state-lift-state.md

## Summary

- **Total directories added:** 8
- **Total files added:** ~30 markdown files
- **Total disk footprint:** 628K for entire `.cursor/` directory
