const {test}=require('@playwright/test');
const path = require('node:path');

async function takeScreenshot (page, name, folder=process.env.SCREENSHOT_DIR ) {
const filename=name.replace(/[^a-zA-Z0-9-_ ]/g, '').trim();  // remove characters Windows 
const filePath = path.join(folder, `${filename}-${Date.now()}.png`);      //Create the complete file path

//This tells Playwright:Take a screenshot of the current page.
//The screenshot is stored in the variable:image.

const image = await page.screenshot({
        path:filePath, fullPage: true });

await test.info().attach(name, { body: image, contentType: 'image/png' }); //Attach screenshot to Playwright report
       
console.log('Screenshot saved:', filePath); //Print the saved location
}

module.exports = {takeScreenshot};  //Export the function :This makes the function available to other JavaScript files.