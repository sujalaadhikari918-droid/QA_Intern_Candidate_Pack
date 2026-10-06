const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../Page model/login');
const {TaskPage} = require('../Page model/task');
const {testData} = require('../test-data/users.json');

test.beforeEach(async ({page}) => {
  const loginPage = new LoginPage(page);
  const taskPage = new TaskPage(page);
  await loginPage.navigate();
});

test('Valid Login', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(testData.qaUser.email, testData.qaUser.password);
  await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
});

test('Invalid Login', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);
  await expect(page.getByText('Invalid email or password')).toBeVisible();
});  

test('Create a valid task', async ({page}) => {
  const loginPage = new LoginPage(page);
  const taskPage = new TaskPage(page);
  await loginPage.login(testData.qaUser.email, testData.qaUser.password);
  await taskPage.createTask(testData.taskData.taskName, testData.taskData.taskDescription);
});

test('Create a task with missing required fields', async ({page}) => {
  const loginPage = new LoginPage(page);
  const taskPage = new TaskPage(page);
  await loginPage.login(testData.validLogin.username, testData.validLogin.password);
  await taskPage.createTask(testData.invalidTask.title, testData.invalidTask.description);
  await expect(page.getByLabel('Title')).toHaveJSProperty('validationMessage', 'Please fill out this field.');
});