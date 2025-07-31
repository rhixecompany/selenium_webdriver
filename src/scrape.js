import { By, Browser, until, Builder } from "selenium-webdriver";

import Chrome from "selenium-webdriver/chrome.js";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { performGet, parsePage, clickElement } from "./utils.js";

let driver; // Declare driver outside the async function

let userDataDir;

let comicData = [];
let chapterData = [];
let newChapterData = [];

async function initializeDriver() {
  let service;
  let options; // Declare options outside the async function
  options = new Chrome.Options();
  let __filename = fileURLToPath(import.meta.url);
  let __dirname = dirname(__filename);

  let directoryName = "chrome-profile";
  let directoryPath = path.join(__dirname, "../", directoryName); // Creates in the same directory as the script

  userDataDir = fs.mkdtempSync(directoryPath, { recursive: true }); // recursive: true creates parent directories if needed

  options.addArguments("--headless=new");
  options.addArguments("--disable-gpu"); // Recommended for headless
  options.addArguments("--window-size=1920,1080"); // Set a large window size for better element visibility
  options.addArguments(`--user-data-dir=${userDataDir}`);
  options.addArguments("--no-sandbox"); // Bypass OS security model (use with caution)

  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--enable-unsafe-swiftshader");
  options.setPageLoadStrategy("eager");
  options.setAcceptInsecureCerts(true);
  options.excludeSwitches("enable-automation");
  service = new Chrome.ServiceBuilder();
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
    let totalPages = 6; // Assume you know the total pages or can extract it

    while (currentPage <= totalPages) {
      console.log(`Scraping page ${currentPage}`);
      console.log("Current URL:", await driver.getCurrentUrl());

      // Find and process elements on the current page
      await parsePage(driver);

      // Navigate to the next page (if not the last page)
      if (currentPage < totalPages) {
        await driver.wait(
          until.elementLocated(
            By.xpath(
              "//div[@class='flex items-center justify-center py-[15px] bg-[#222222] ']/a[2]",
            ),
          ),
          50000,
        ); // Wait up to 5 seconds
        await clickElement(
          driver,
          By.xpath(
            "//div[@class='flex items-center justify-center py-[15px] bg-[#222222] ']/a[2]",
          ),
        );
        await driver.wait(
          until.elementLocated(
            By.xpath(
              "//div[@class='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4']/a",
            ),
          ),
          10000,
        ); // Wait for page to load
      }
      currentPage++;
    }

    // Now you can interact with the element
  } catch (error) {
    console.error("Error: Element not located within the timeout.", error);
  } finally {
    if ((await comicData.length) > 0) {
      // Write comics object to file..
      await fs.writeFileSync(
        "./comics.json",
        JSON.stringify(await comicData, null, 2),
      );
      console.log(`Comics_count: ${await comicData.length}`);
    } else {
      console.error("Comics Not Found");
    }
    if ((await chapterData.length) > 0) {
      // Write chapters object to file..
      fs.writeFileSync(
        "./chapters.json",
        JSON.stringify(await chapterData, null, 2),
      );

      console.log(`Chapters_count: ${await chapterData.length}`);
    } else {
      console.error("Chapters Not Found");
    }

    await driver.quit();
    await fs.rmSync(userDataDir, { recursive: true, force: true });
  }
}
let url = "https://asuracomic.net/series?page=1";
automateProcess(url);
