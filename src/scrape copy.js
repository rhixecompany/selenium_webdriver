import { By, Browser, until, Builder } from 'selenium-webdriver';

import Chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";

import { performGet, parsePage, clickElement } from './utils.js'

let driver; // Declare driver outside the async function

let userDataDir;

let comicData = []
let chapterData = []


async function initializeDriver() {
    let service;
    let options; // Declare options outside the async function
    options = new Chrome.Options();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const directoryName = 'chrome-profile';
    const directoryPath = path.join(__dirname, '../', directoryName); // Creates in the same directory as the script

    userDataDir = fs.mkdtempSync(directoryPath, { recursive: true }); // recursive: true creates parent directories if needed

    options.addArguments('--headless=new')
    // options.addArguments('--disable-gpu'); // Recommended for headless
    // options.addArguments('--window-size=1920,1080'); // Set a large window size for better element visibility
    options.addArguments(`--user-data-dir=${userDataDir}`);
    // options.addArguments('--no-sandbox'); // Bypass OS security model (use with caution)

    // options.addArguments('--disable-dev-shm-usage');
    // options.addArguments('--enable-unsafe-swiftshader');
    options.setPageLoadStrategy("eager")
    // options.setAcceptInsecureCerts(true)
    options.excludeSwitches('enable-automation')
    service = new Chrome.ServiceBuilder()
    driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeService(service)
        .setChromeOptions(options)
        .build();
}

async function automateProcess(url) {
    await initializeDriver(); // Initialize driver once


    try {
        await performGet(driver, url);
        let currentPage = 1;
        const totalPages = 20; // Assume you know the total pages or can extract it

        while (currentPage <= totalPages) {
            console.log(`Scraping page ${currentPage}`);
            console.log('Current URL:', await driver.getCurrentUrl());

            // Find and process elements on the current page
            await parsePage(driver);




            // Navigate to the next page (if not the last page)
            if (currentPage < totalPages) {
                await clickElement(driver, By.xpath("//*[@class='flex items-center justify-center py-[15px] bg-[#222222] ']/a[2]"));
                await driver.wait(until.elementLocated(By.xpath("//div[@class='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4']/a")), 10000); // Wait for page to load
            }
            currentPage++;
        }


        // Now you can interact with the element
    } catch (error) {
        console.error('Error: Element not located within the timeout.', error);
    } finally {
        // Write comics object to file..
        fs.writeFileSync("./comics.json", JSON.stringify(comicData, null, 2));
        // Write chapters object to file..
        fs.writeFileSync("./chapters.json", JSON.stringify(chapterData, null, 2));
        console.log(`Found ${comicData.length} comics.`);
        console.log(`Found ${chapterData.length} chapters.`);
        await driver.quit();
        await fs.rmSync(userDataDir, { recursive: true, force: true });
    }

}
const url = 'https://asuracomic.net/series?page=1'
automateProcess(url);