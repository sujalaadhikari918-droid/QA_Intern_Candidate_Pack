# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: taskflow.spec.js >> Create a task with missing required fields
- Location: tests\taskflow.spec.js:37:5

# Error details

```
ReferenceError: title is not defined
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e2]:
    - region [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - generic [ref=e6]: TF
          - generic [ref=e7]:
            - strong [ref=e8]: TaskFlow
            - generic [ref=e9]: QA User
        - generic [ref=e10]:
          - generic [ref=e11]: intern@example.com
          - button "Logout" [ref=e12] [cursor=pointer]
      - generic [ref=e13]:
        - generic [ref=e14]:
          - generic [ref=e15]:
            - heading "Tasks" [level=1] [ref=e16]
            - paragraph [ref=e17]: Plan, track and complete internship work.
          - button "+ Add Task" [ref=e18] [cursor=pointer]
        - generic "Task controls" [ref=e19]:
          - searchbox "Search tasks..." [ref=e21]
          - generic [ref=e22]:
            - generic [ref=e23]: Status
            - combobox "Status" [ref=e24]:
              - option "All" [selected]
              - option "Todo"
              - option "In Progress"
              - option "Done"
        - generic [ref=e25]:
          - generic [ref=e26]: "Total: 3"
          - generic [ref=e27]: "Showing: 3"
        - table [ref=e29]:
          - rowgroup [ref=e30]:
            - row [ref=e31]:
              - columnheader "Title" [ref=e32]
              - columnheader "Status" [ref=e33]
              - columnheader "Priority" [ref=e34]
              - columnheader "Due date" [ref=e35]
              - columnheader "Owner" [ref=e36]
              - columnheader "Actions" [ref=e37]
          - rowgroup [ref=e38]:
            - row [ref=e39]:
              - cell "Review login requirements Check positive and negative authentication flows." [ref=e40]:
                - generic [ref=e41]: Review login requirements
                - generic [ref=e42]: Check positive and negative authentication flows.
              - cell "Todo" [ref=e43]
              - cell "High" [ref=e45]
              - cell "2026-10-08" [ref=e46]
              - cell "QA Team" [ref=e47]
              - cell [ref=e48]:
                - generic [ref=e49]:
                  - button "Edit" [ref=e50] [cursor=pointer]
                  - button "Delete" [ref=e51] [cursor=pointer]
            - row [ref=e52]:
              - cell "Prepare Smoke Checklist Create the minimum release verification checks." [ref=e53]:
                - generic [ref=e54]: Prepare Smoke Checklist
                - generic [ref=e55]: Create the minimum release verification checks.
              - cell "In Progress" [ref=e56]
              - cell "Medium" [ref=e58]
              - cell "2026-10-10" [ref=e59]
              - cell "QA Team" [ref=e60]
              - cell [ref=e61]:
                - generic [ref=e62]:
                  - button "Edit" [ref=e63] [cursor=pointer]
                  - button "Delete" [ref=e64] [cursor=pointer]
            - row [ref=e65]:
              - cell "Archive completed report Store final release evidence." [ref=e66]:
                - generic [ref=e67]: Archive completed report
                - generic [ref=e68]: Store final release evidence.
              - cell "Done" [ref=e69]
              - cell "Low" [ref=e71]
              - cell "2026-10-13" [ref=e72]
              - cell "QA Team" [ref=e73]
              - cell [ref=e74]:
                - generic [ref=e75]:
                  - button "Edit" [ref=e76] [cursor=pointer]
                  - button "Delete" [ref=e77] [cursor=pointer]
  - dialog [ref=e78]:
    - generic [ref=e79]:
      - generic [ref=e80]:
        - heading "Add Task" [level=2] [ref=e81]
        - button "Close" [ref=e82] [cursor=pointer]: ×
      - generic [ref=e83]:
        - generic [ref=e84]: Title *
        - textbox "Title *" [active] [ref=e85]
        - generic [ref=e86]: 3-50 characters
        - alert
      - generic [ref=e87]:
        - generic [ref=e88]: Description
        - textbox "Description" [ref=e89]: This is a test task description.
        - generic [ref=e90]: Maximum 200 characters
      - generic [ref=e91]:
        - generic [ref=e92]:
          - generic [ref=e93]: Status
          - combobox "Status" [ref=e94]:
            - option "Todo" [selected]
            - option "In Progress"
            - option "Done"
        - generic [ref=e95]:
          - generic [ref=e96]: Priority
          - combobox "Priority" [ref=e97]:
            - option "Low"
            - option "Medium" [selected]
            - option "High"
      - generic [ref=e98]:
        - generic [ref=e99]: Due date *
        - textbox "Due date *" [ref=e100]: 2026-10-07
        - alert
      - generic [ref=e101]:
        - button "Cancel" [ref=e102] [cursor=pointer]
        - button "Save Task" [ref=e103] [cursor=pointer]
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | 
  3  | test.beforeEach(async ({page}) => {
  4  |   await page.goto('http://127.0.0.1:4173');
  5  | });
  6  | 
  7  | // Test 1 Valid Login
  8  | test('Valid Login', async ({page}) => {
  9  |   await page.getByLabel('Email').fill('intern@example.com');
  10 |   await page.getByLabel('Password').fill('Intern@123');
  11 |   await page.getByRole('button', {name: 'Sign in'}).click();
  12 |   await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
  13 | });
  14 | 
  15 | // Test 2 Invalid Login
  16 | test('Invalid Login', async ({page}) => {
  17 |     await page.getByLabel('Email').fill('user@gmail.com');
  18 |     await page.getByLabel('Password').fill('User@123');
  19 |     await page.getByRole('button', {name: 'Sign in'}).click();
  20 |     await expect(page.getByText('Invalid email or password')).toBeVisible();
  21 |   });
  22 | 
  23 | // Test 3 Create a valid task
  24 | test('Create a valid task', async ({page}) => {
  25 |   await page.getByLabel('Email').fill('intern@example.com');
  26 |   await page.getByLabel('Password').fill('Intern@123');
  27 |   await page.getByRole('button', {name: 'Sign in'}).click();
  28 |   
  29 |   await page.getByRole('button', {name: 'Add Task'}).click();
  30 | 
  31 |   await page.getByLabel('Title').fill('Test Task');
  32 |   await page.getByLabel('Description').fill('This is a test task description.');
  33 |   await page.getByRole('button', {name: 'Save Task'}).click();
  34 | });
  35 | 
  36 | // Test 4 Create a task with missing required fields
  37 | test('Create a task with missing required fields', async ({page}) => {
  38 |   await page.getByLabel('Email').fill('intern@example.com');
  39 |   await page.getByLabel('Password').fill('Intern@123');
  40 |   await page.getByRole('button', {name: 'Sign in'}).click();
  41 | 
  42 |   await page.getByRole('button', {name: 'Add Task'}).click();
  43 | 
  44 |   // Leave some fields empty
  45 |   await page.getByLabel('Title').fill('');
  46 |   await page.getByLabel('Description').fill('This is a test task description.');
  47 |   await page.getByRole('button', {name: 'Save Task'}).click();
  48 | 
  49 |   // Expect an error message for the missing title
> 50 |   await expect(title).toHaveJSProperty('validationMessage', 'Please fill out this field.');
     |                ^ ReferenceError: title is not defined
  51 | }); 
```