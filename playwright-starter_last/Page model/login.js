const {expect, test} = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', {name: 'Sign in'});
  }

  async navigate() {
    await this.page.goto('http://127.0.0.1:4173');
  }
async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}

module.exports = {LoginPage};
