import { By, Browser, until, Builder } from 'selenium-webdriver';
import { getBinaryPaths } from 'selenium-webdriver/common/driverFinder.js'
import Chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';
import os from 'os';
import path from 'path';

let driver; // Declare driver outside the async function
let options; // Declare options outside the async function
let userDataDir;
let service;

async function initializeDriver() {
    options = new Chrome.Options();
    let paths = getBinaryPaths(options);
    let driverPath = paths.driverPath;
    let browserPath = paths.browserPath;
    options.setChromeBinaryPath(browserPath);
    userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-profile-'));
    options.addArguments('--headless=new')
    options.addArguments('--disable-gpu'); // Recommended for headless
    options.addArguments('--window-size=1920,1080'); // Set a large window size for better element visibility
    options.addArguments(`--user-data-dir=${userDataDir}`);
    options.addArguments('--no-sandbox'); // Bypass OS security model (use with caution)

    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--enable-unsafe-swiftshader');
    options.setPageLoadStrategy("eager")
    options.setAcceptInsecureCerts(true)
    options.excludeSwitches('enable-automation')
    service = new Chrome.ServiceBuilder(driverPath)
    driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeService(service)
        .setChromeOptions(options)
        .build();
}

async function performGet(driver, url) {

    await driver.get(url);
    console.log('Current URL:', await driver.getCurrentUrl());
}

async function performNavigate(driver, url) {
    // // Function 1: Navigate to a URL
    // console.log(`Navigating from ${await driver.getCurrentUrl()}`);
    await driver.navigate().to(url);

    console.log('Current URL:', await driver.getCurrentUrl());

}

async function clickElement(locator, driver) {
    try {
        const element = await driver.wait(until.elementLocated(locator), 50000); // Wait up to 5 seconds
        await element.click();
        console.log('Element clicked successfully.');
    } catch (error) {

        if (error.name === 'StaleElementReferenceError') {
            console.log("Stale element, retrying...");
            retries--;
        } else {
            throw error;
        }
    }
}

async function parsePage(driver) {
    let links = []
    let elements = await driver.findElements(By.xpath(
        "//div[@class='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4']/a",
    )); // Example selector
    for (let element of elements) {
        links.push(await element.getAttribute('href'))
    }
    let comicdetails = []
    for (let item of links) {
        await performNavigate(driver, item)
        let data = await parsePageDetail(driver);
        comicdetails.push(data)
    }
    console.log(JSON.stringify(comicdetails, null, 2))
    return links
}
async function parsePageDetail(driver) {
    let title = await driver.findElement(By.xpath("//div[@class='text-center sm:text-left']/span[@class='text-xl font-bold']")).getText()
    let image = await driver.findElement(By.xpath("//div[@class='relative col-span-full sm:col-span-3 space-y-3 px-6 sm:px-0']/img[@class='rounded mx-auto md:mx-0']")).getAttribute("src")
    // let image1 = driver.findElement(By.xpath("//div[@class='bigcover']/img")).getAttribute("src")
    return { title, image }

}

async function Download(url) {
    await initializeDriver(); // Initialize driver once

    try {
        await performGet(driver, url);
        let retries = 3;
        while (retries > 0) {
            try {
                // Example: Clicking a "View More" button
                await clickElement(By.xpath("//*[@class='flex items-center justify-center py-[15px] bg-[#222222] ']/a[2]"), driver);


                let comicpagelinks = await parsePage(driver);
                console.log(`Found ${comicpagelinks.length} comic links.`);

                // Example: Check for a condition to stop the loop
                const nextButton = await driver.findElements(By.xpath("//*[@class='flex items-center justify-center py-[15px] bg-[#222222] ']/a[2]"));
                if (nextButton.length === 0) {
                    retries--;
                }

            } catch (error) {
                if (error.name === 'StaleElementReferenceError') {
                    console.log("Stale element, retrying...");
                    retries--;
                } else {
                    throw error;
                }
            }
        }
        throw new Error("Failed to click element after multiple retries.");


    } finally {
        if (driver) {
            await driver.quit();
            driver = null;
        }
        if (userDataDir) {
            fs.rmSync(userDataDir, { recursive: true, force: true });
            userDataDir = null;
        }
    }
}
const url = 'https://asuracomic.net/series?page=1';
Download(url);