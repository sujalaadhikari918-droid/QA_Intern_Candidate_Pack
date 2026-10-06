import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('http://127.0.0.1:4173');
});

// Test 1 Valid Login
test('Valid Login', async ({page}) => {
  await page.getByLabel('Email').fill('intern@example.com');
  await page.getByLabel('Password').fill('Intern@123');
  await page.getByRole('button', {name: 'Sign in'}).click();
  await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
});

// Test 2 Invalid Login
test('Invalid Login', async ({page}) => {
    await page.getByLabel('Email').fill('user@gmail.com');
    await page.getByLabel('Password').fill('User@123');
    await page.getByRole('button', {name: 'Sign in'}).click();
    await expect(page.getByText('Invalid email or password')).toBeVisible();
  });

// Test 3 Create a valid task
test('Create a valid task', async ({page}) => {
  await page.getByLabel('Email').fill('intern@example.com');
  await page.getByLabel('Password').fill('Intern@123');
  await page.getByRole('button', {name: 'Sign in'}).click();
  
  await page.getByRole('button', {name: 'Add Task'}).click();

  await page.getByLabel('Title').fill('Test Task');
  await page.getByLabel('Description').fill('This is a test task description.');
  await page.getByRole('button', {name: 'Save Task'}).click();
});

// Test 4 Create a task with missing required fields
test('Create a task with missing required fields', async ({page}) => {
  await page.getByLabel('Email').fill('intern@example.com');
  await page.getByLabel('Password').fill('Intern@123');
  await page.getByRole('button', {name: 'Sign in'}).click();

  await page.getByRole('button', {name: 'Add Task'}).click();

  // Leave some fields empty
  await page.getByLabel('Title').fill('');
  await page.getByLabel('Description').fill('This is a test task description.');
  await page.getByRole('button', {name: 'Save Task'}).click();

  // Expect an error message for the missing title
  await expect(title).toHaveJSProperty('validationMessage', 'Please fill out this field.');
}); 