const {expect, test} = require('@playwright/test');

class TaskPage {
  constructor(page) {
    this.page = page;
    this.addTaskButton = page.getByRole('button', {name: 'Add Task'});
    this.titleInput = page.getByLabel('Title');
    this.descriptionInput = page.getByLabel('Description');
    this.saveTaskButton = page.getByRole('button', {name: 'Save Task'});
  }

  async createTask(title, description) {
    await this.addTaskButton.click();
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.saveTaskButton.click();
  }
}
module.exports = {TaskPage};