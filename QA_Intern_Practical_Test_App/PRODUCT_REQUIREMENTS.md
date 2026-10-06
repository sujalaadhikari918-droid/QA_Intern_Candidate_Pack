# TaskFlow Product Requirements (Candidate Copy)

Use this document as the expected behavior when testing the application.

## Authentication
1. The supplied QA User credentials must allow login.
2. Invalid credentials must show a clear error and must not create a session.
3. Email login must ignore leading/trailing spaces and must be case-insensitive.
4. Logout must end the current session and return the user to the login screen.

## Roles
5. **QA User** can create, edit, view and delete tasks.
6. **Viewer** is read-only: the Viewer can view, search and filter tasks but cannot create, edit or delete tasks.

## Task rules
7. Title is required and must be **3-50 characters**.
8. Description is optional and must be **0-200 characters**.
9. Status must be one of: Todo, In Progress, Done.
10. Priority must be one of: Low, Medium, High.
11. Due date is required and must be **today or a future date**.
12. Saving a valid task must show it in the task list.
13. Editing a task must update the existing task, not create a duplicate.
14. Delete must ask for confirmation before removing a task.

## Search and filter
15. Search must match title or description and must be **case-insensitive**.
16. Status filter must show only tasks with the selected exact status.
17. If no tasks match, the user must see a clear empty-state message.

## Usability and accessibility basics
18. The main functions must be usable at desktop and mobile widths without content becoming inaccessible.
19. Form fields and controls should have clear labels or accessible names.
20. Keyboard focus should be visible on interactive controls.
