const { test } = require('@playwright/test');
const data = require('../testdata/appData');
const { takeScreenshot  } = require('../utils/screenshots');

let page;

test.beforeAll('RBAC LOGIN FLOW', async ({browser}) => {
    test.setTimeout(120000);
    page = await browser.newPage();
    await page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
    console.log(await page.title());
    await page.getByPlaceholder('Enter Email ID').fill(process.env.RBAC_USER);
    await page.waitForTimeout(2000); // milliseconds
    await page.locator("//input[@placeholder='Enter Password ']").fill(process.env.RBAC_PASS);
    await page.waitForTimeout(2000); // milliseconds
    await page.getByRole('button').click();
    await page.waitForTimeout(2000); // milliseconds
    

});

for(const app of data.applications){    
test('create new application', async()=>
{
//const appName = `Indofats Test App ${Date.now()}`; // if you want to generate unique name for
await page.locator("//a[@id='mobile-collapse']").click();
await page.waitForTimeout(2000); // milliseconds
await page.locator('span:has-text("Application")').click();
await page.waitForTimeout(2000); // milliseconds
await page.locator("//a[@id='mobile-collapse']").click();
await page.getByText('Add Application').click();
await page.waitForTimeout(2000);
await page.getByPlaceholder('Enter app name').fill(app.appName);
await page.waitForTimeout(2000);
await page.getByPlaceholder('Enter app description').fill(app.appDescription);
await page.waitForTimeout(2000);
await takeScreenshot(page, 'New Application details');
await page.getByRole('button', { name: 'Submit' }).click();
await page.waitForTimeout(2000);
await takeScreenshot(page, 'New Application created');
await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'OK' }).click();
await page.waitForTimeout(2000);
await page.getByPlaceholder('Search applications').click();
await page.getByPlaceholder('Search applications').fill(app.appName);
await takeScreenshot(page, 'search New Application created');

}
);
}

for(const pg of data.pages){
test('Test to create newpage', async()=>
{

const appToSelect = data.applications[0].appName;
await page.locator("//a[@id='mobile-collapse']").click();
await page.locator('a').filter({ hasText: 'Pages' }).click();
await page.locator("//a[@id='mobile-collapse']").click();
await page.getByText('Add Page').click();
await page.getByPlaceholder('Enter page name').fill(pg.pageName);
await page.getByPlaceholder('Enter page description').fill(pg.pageDescription);
await page.locator("//input[@role='combobox']").click();
await page.locator("//input[@role='combobox']").fill(appToSelect);
await page.getByRole('option', { name: appToSelect }).click();
await page.waitForTimeout(2000);
await takeScreenshot(page, 'New Page details');
await page.getByRole('button', { name: 'Submit' }).click();
await page.waitForTimeout(2000);
await takeScreenshot(page, 'New Page created');
await page.getByRole('button', { name: 'OK' }).click();
await page.waitForTimeout(2000);
await page.getByPlaceholder('Search pages').click();
await page.getByPlaceholder('Search pages').fill(pg.pageName);
await takeScreenshot(page, 'search New Page created');

}

);
}
for(const fea of data.features){
test('Test to create new feature and assign to page', async()=>
{
const pagetoselect=data.pages[0].pageName;
await page.locator("//a[@id='mobile-collapse']").click();
await page.locator('i.feather.icon-features').click();
await page.locator("//a[@id='mobile-collapse']").click();
await page.getByText('Add Feature').click();
await page.getByRole('textbox', { name: 'Enter feature name' }).fill(fea.featurename);
await page.waitForTimeout(2000);
await page.getByPlaceholder('Enter feature description').fill(fea.featureDescription);
await page.waitForTimeout(2000);
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill(pagetoselect);
await page.getByRole('option', { name: pagetoselect }).click();
await page.waitForTimeout(2000);
await takeScreenshot(page, 'New feature details');
await page.getByRole('button', { name: 'Submit' }).click();
await page.waitForTimeout(2000);
await takeScreenshot(page, 'New feature created');
await page.getByRole('button', { name: 'OK' }).click();
await page.waitForTimeout(2000);
await page.getByPlaceholder('Search feature').click();
await page.getByPlaceholder('Search feature').fill(fea.featurename);
await takeScreenshot(page, 'search New feature created');
}
)
}
for(const rol of data.Roles){
test('Test to create New role', async()=>
{
const appToSelect = data.applications[0].appName;    
await page.locator("//a[@id='mobile-collapse']").click();
await page.getByText('Roles').click();
await page.locator("//a[@id='mobile-collapse']").click();
await page.getByText('Add Role', { exact: true }).click();
await page.getByPlaceholder('Enter user role name').fill(rol.rolename);
await page.getByPlaceholder('Enter role description').fill(rol.roleDescription);
await page.getByRole('combobox').click();
await page.getByRole('combobox').fill(appToSelect);
await page.getByRole('option', { name: appToSelect }).click();
await page.locator('span.slider.round.inner-slider').click();
await page.getByRole('checkbox').nth(1).click();
await page.locator("//div[@class='col-md-6 col-lg-6']//div//span[@class='slider round inner-slider']").click();
await page.waitForTimeout(2000);
await takeScreenshot(page, 'New Role details');
await page.getByRole('button', { name: 'Submit' }).click();
await page.waitForTimeout(2000);
await takeScreenshot(page, 'New role created');
await page.getByRole('button', { name: 'OK' }).click();
await page.waitForTimeout(2000);
await page.getByPlaceholder('Search roles').click();
await page.getByPlaceholder('Search roles').fill(rol.rolename);
await takeScreenshot(page, 'search New role created');

}
)
}
for(const uid of data.users){
test('Test to Assign role to user', async()=>
{
const appToSelect=data.applications[0].appName;
const roleToSelect=data.Roles[0].rolename;    
await page.locator("//a[@id='mobile-collapse']").click();
await page.getByText('Users', { exact: true }).click();
await page.locator("//a[@id='mobile-collapse']").click();
await page.getByPlaceholder('Search users').fill(uid.userid);
await page.locator('span.fas.fa-link').click();
await page.locator("//input[@role='combobox']").click();
await page.locator("//input[@role='combobox']").fill(appToSelect);
await page.getByRole('option', { name: appToSelect }).click();
await page.waitForTimeout(2000);
await page.getByText('Choose userRole').click();
await page.waitForTimeout(2000);
//await page.getByText('Choose userRole').fill(roleToSelect);
//await page.getByRole('option', { name: roleToSelect }).click();
await page.locator('ul.item2').locator('li').nth(0).click();
await page.waitForTimeout(2000);
await page.getByText('User Role*').click();
await page.waitForTimeout(2000);
await takeScreenshot(page, 'New Role user assign details');
await page.getByText('Submit').click();
await page.waitForTimeout(2000);
await takeScreenshot(page, 'New Role user assigned');
await page.locator('button:has-text("OK")').click();
await page.waitForTimeout(2000);
await page.getByPlaceholder('Search users').click();
await page.getByPlaceholder('Search users').fill(uid.userid);
await takeScreenshot(page, 'search user details');

}
)
}
test('Test to UnAssign role from user',  async()=>
{
const Searchuserid= data.users[0].userid;
const roleToSelect=data.Roles[0].rolename;  
await page.getByPlaceholder('Search users').fill(Searchuserid);
await page.locator('span.fas.fa-unlink').click();
await page.waitForTimeout(2000);
await page.locator('li')
  .filter({ has: page.getByText(roleToSelect, { exact: true }) })
  .getByRole('checkbox')
  .check();
await page.waitForTimeout(2000);
await takeScreenshot(page, 'New Role user unassign details');
await page.getByRole('button', { name: 'Submit' }).click();
await page.waitForTimeout(2000);
await takeScreenshot(page, 'New Role user unassigned ');
await page.getByRole('button', { name: 'OK' }).click();
await page.waitForTimeout(2000);
await page.getByPlaceholder('Search users').click();
await page.getByPlaceholder('Search users').fill(Searchuserid);
await takeScreenshot(page, 'user search for unassign role ');

}
)