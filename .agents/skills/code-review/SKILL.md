---
name: code-review
description: Comprehensive guidelines for performing code reviews, identifying bugs, security vulnerabilities, performance bottlenecks, and adherence to clean architecture principles.
---

# Code Review Skill

This skill provides a structured checklist and methodology for reviewing source code changes and ensuring high code quality.

## Review Checklist

### 1. Correctness & Logic
- Does the code accomplish the intended functionality?
- Are edge cases handled (empty lists, null/undefined, network timeouts, invalid inputs)?
- Are errors handled gracefully with informative error messages?

### 2. Architecture & Design
- Does the code adhere to DRY (Don't Repeat Yourself) and SOLID principles?
- Is modular separation of concerns maintained (UI logic separate from data access)?
- Are naming conventions clear, descriptive, and consistent with the codebase?

### 3. Security Best Practices
- Are user inputs sanitized and validated?
- Are secrets, API keys, or credentials excluded from source control?
- Are dangerous methods avoided (e.g. `eval`, unsanitized `innerHTML`)?

### 4. Performance & Efficiency
- Are unnecessary re-renders, recalculations, or redundant DOM mutations avoided?
- Are large assets or network requests properly throttled, debounced, or cached?
- Are event listeners cleaned up to prevent memory leaks?
