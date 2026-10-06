# Candidate Playwright Starter

Create your tests in `tests/` and page objects in `pages/`.

Recommended minimum automated flows for the exam:
1. Valid login
2. Invalid login
3. Create a valid task
4. One additional stable behavior (for example required-title validation, search, filter, edit, or logout)

Do not add hard waits such as `waitForTimeout()` to make tests pass. Assert the user-visible business result.
