require('dotenv').config();
const { expect} = require('@playwright/test');
const {Given, When, Then}=require('@cucumber/cucumber');
const palywright = require('@playwright/test');

const { BASE_URL, RBAC_USER, RBAC_PASS } = process.env;


Given('I am on the login page', async function () {
  const browser=await palywright.chromium.launch({headless:false});
  const context=await browser.newContext();
   this.page=await context.newPage();
  await this.page.goto(BASE_URL);
  console.log(await this.page.title());

});

When('I enter valid credentials and click on the submit button', async function () {
    await this.page.getByPlaceholder('Enter Email ID').fill(RBAC_USER);
    await this.page.waitForTimeout(2000); // milliseconds
    await this.page.locator("//input[@placeholder='Enter Password ']").fill(RBAC_PASS);
    await this.page.waitForTimeout(2000); // milliseconds

});

Then('I should be redirected to the dashboard', async function () {
  await this.page.getByRole('button').click();

});
