---
name: verify-changes
description: Runs comprehensive verification on code changes. Triggers when user says "verify my changes", "check my work", "run verification", "validate changes", or "QA check".
---

# Change Verification

Run all 4 verification agents in parallel to validate changes before committing or deploying.

## Agents (run in parallel)

### 1. PII Compliance Checker
```
Task: pii-compliance-checker
Prompt: "Review the recently changed files for PII handling violations.
        Check: masking, audit logging, data leaks in console/errors."
```

### 2. Security Scanner
```
Task: security-scanner  
Prompt: "Run Snyk scans on the project.
        - snyk_code_scan for source vulnerabilities
        - snyk_sca_scan for dependency vulnerabilities
        Report critical/high findings."
```

### 3. Verifier
```
Task: verifier
Prompt: "Verify the implementation is complete and functional.
        Check: no broken imports, no TODO placeholders, UI renders correctly."
```

### 4. Test Runner
```
Task: Test Runner
Prompt: "Run the test suite. If tests fail, report which tests failed and why.
        Do not auto-fix unless explicitly asked."
```

## Output

Combine results into a verification report:

```markdown
## Verification Report

| Check | Status | Findings |
|-------|--------|----------|
| PII Compliance | ✅/⚠️/❌ | [summary] |
| Security | ✅/⚠️/❌ | [summary] |
| Implementation | ✅/⚠️/❌ | [summary] |
| Tests | ✅/⚠️/❌ | [pass/fail count] |

### Issues to Address
1. [Issue from any failing check]
2. [Issue from any failing check]

### Ready to Commit: Yes/No
```
