---
name: git-workflow
description: Standardized conventions for Git version control, semantic commit messages, branching strategies, and pull request workflows.
---

# Git Workflow Skill

This skill defines standardized workflows for Git version control and collaborative software development.

## 1. Conventional Commits Standard
Format: `<type>(<optional scope>): <short description>`

### Commit Types:
- `feat`: A new feature for the user or application.
- `fix`: A bug fix.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (formatting, white-space, semi-colons).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to build process, auxiliary tools, or libraries.

### Examples:
- `feat(portfolio): add interactive project cards with preview modal`
- `fix(styles): fix navigation layout shift on mobile viewports`
- `refactor(api): simplify client request error handling`

## 2. Branching Strategy
- `main` / `master`: Production-ready branch.
- `feature/<feature-name>`: Dedicated branch for new features.
- `fix/<bug-name>`: Dedicated branch for bug fixes.
- `chore/<task-name>`: Maintenance, dependency updates, and tooling.

## 3. Pull Request Guidelines
- Provide a clear summary of changes.
- Include a walkthrough of what was tested.
- Ensure all CI/CD checks and automated test suites pass prior to merging.
