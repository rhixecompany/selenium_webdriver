import { By, Browser, until, Builder } from "selenium-webdriver";

import Chrome from "selenium-webdriver/chrome.js";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {
  clickElement,
  textElement,
  textElements,
  textareaElement,
  imageElement,
  hrefElement,
  performGet,
  clickNormalElement,
  textNormalElement,
} from "./utils.js";

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

export async function parsePage(driver) {
  let comicLinks = await textElements(
    driver,
    By.xpath(
      "//div[@class='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4']/a",
    ),
  );
  for (let i = 0; i < comicLinks.length; i++) {
    let link = await comicLinks[i];

    // Navigate to individual comic page
    await link.click();
    await driver.wait(until.urlContains("https://asuracomic.net"), 10000); // Wait for detail page to load
    // await driver.wait(
    //   until.elementLocated(
    //     By.xpath('//span[contains(@class, "text-xl font-bold")]'),
    //   ),
    //   10000,
    // );

    comicData.push(await parsePageComicDetail(driver));

    await driver.navigate().back(); // Go back to the comic listing page
    await driver.wait(until.urlContains("https://asuracomic.net"), 10000); // Wait for listing page to reload
    // await driver.wait(
    //   until.elementLocated(
    //     By.xpath(
    //       "//div[@class='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4']/a",
    //     ),
    //   ),
    //   10000,
    // );
    // Re-locate comic links on the listing page after navigating back
    comicLinks = await textElements(
      driver,
      By.xpath(
        "//div[@class='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4']/a",
      ),
    );
  }
}

export async function parsePageChapterDetail(driver, updatedOn) {
  let urlString = await hrefElement(
    driver,
    By.xpath(
      "//div[@class='flex flex-col items-center space-y-2 pt-6 px-5 text-center']/p/a",
    ),
  );
  let urlParts = await urlString.split("/");

  let comictitle = await textElement(
    driver,
    By.xpath(
      "//div[@class='flex flex-col items-center space-y-2 pt-6 px-5 text-center']/p/a/span",
    ),
  );
  let comicslug = await urlParts[4];
  let text = await textElement(
    driver,
    By.xpath('//button[contains(@class, "px-3 py-2 dropdown-btn")]/h2'),
  );
  let commaIndex = text.indexOf("-"); // Find the index of the comma
  let images = [];
  let image_urls = await textElements(
    driver,
    By.xpath(
      '//div[contains(@class, "w-full mx-auto center")]/img[contains(@class, "object-cover mx-auto")]',
    ),
  );
  for (let i = 0; i < image_urls.length; i++) {
    images.push({
      url: await image_urls[i].getAttribute("src"),
    });
  }
  if (commaIndex !== -1) {
    // Check if the character exists
    let name = text.slice(0, commaIndex).trim();
    let title = text.slice(commaIndex + 1).trim();
    let obj = { name, title, images, comictitle, comicslug, updatedOn };
    console.log(JSON.stringify(obj, null, 2));
    return obj;
  } else {
    let name = await textElement(
      driver,
      By.xpath('//button[contains(@class, "px-3 py-2 dropdown-btn")]/h2'),
    );
    let obj = { name, images, comictitle, comicslug, updatedOn };
    console.log(JSON.stringify(obj, null, 2));
    return obj;
  }
}

export async function parsePageComicDetail(driver) {
  try {
    let urlString = await driver.getCurrentUrl();
    let urlParts = await urlString.split("/");

    let title = await textElement(
      driver,
      By.xpath('//span[contains(@class, "text-xl font-bold")]'),
    );
    let slug = await urlParts[4];
    let serialization = await textElement(
      driver,
      By.xpath(
        "//div[@class='grid grid-cols-1 md:grid-cols-2 gap-5 mt-8']/div[1]/h3[2]",
      ),
    );
    let author = await textElement(
      driver,
      By.xpath(
        "//div[@class='grid grid-cols-1 md:grid-cols-2 gap-5 mt-8']/div[2]/h3[2]",
      ),
    );
    let artist = await textElement(
      driver,
      By.xpath(
        "//div[@class='grid grid-cols-1 md:grid-cols-2 gap-5 mt-8']/div[3]/h3[2]",
      ),
    );
    let rating = await textElement(
      driver,
      By.xpath('//span[contains(@class, "ml-1 text-xs")]'),
    );
    let status = await textElement(
      driver,
      By.xpath(
        "//div[@class='bg-[#343434] px-2 py-2 flex items-center justify-between rounded-[3px] w-full'][1]/h3[2]",
      ),
    );
    let updatedOn = await textElement(
      driver,
      By.xpath(
        "//div[@class='grid grid-cols-1 md:grid-cols-2 gap-5 mt-8']/div[5]/h3[2]",
      ),
    );
    let type = await textElement(
      driver,
      By.xpath(
        "//div[@class='bg-[#343434] px-2 py-2 flex items-center justify-between rounded-[3px] w-full'][2]/h3[2]",
      ),
    );
    let genres = [];
    let gen = await textElements(
      driver,
      By.xpath("//div[@class='flex flex-row flex-wrap gap-3']/button"),
    );
    for (let i = 0; i < gen.length; i++) {
      genres.push({
        name: await gen[i].getText(),
      });
    }
    let images = [];
    let image = await imageElement(
      driver,
      By.xpath(
        '//div[contains(@class, "relative col-span-full")]/img[contains(@class, "rounded mx-auto")]',
      ),
    );
    try {
      let image1 = await imageElement(
        driver,
        By.xpath(
          '//div[contains(@class, "bigcover")]/img[contains(@data-nimg, "1")]',
        ),
      );
      // let image1 = await driver
      //   .findElement(
      //     driver,
      //     By.xpath(
      //       '//div[contains(@class, "bigcover")]/img[contains(@data-nimg, "1")]',
      //     ),
      //   )
      //   .getAttribute("src");
      images.push(
        {
          url: image,
        },
        {
          url: image1,
        },
      );
    } catch {
      images.push({
        url: image,
      });
    }

    try {
      let description = await textareaElement(
        driver,
        By.xpath(
          '//div[contains(@class, "col-span-12 sm:col-span-9")]/span[contains(@class, "font-medium text-sm text-[#A2A2A2]")]',
        ),
      );

      let obj = {
        title,
        images,
        description,
        slug,
        serialization,
        author,
        artist,
        rating,
        status,
        type,
        genres,
        updatedOn,
      };
      console.log(JSON.stringify(obj, null, 2));

      return obj;
    } catch {
      let description = await textareaElement(
        driver,
        By.xpath(
          '//div[contains(@class, "col-span-12 sm:col-span-9")]/span[contains(@class, "font-medium text-sm text-[#A2A2A2]")]/p',
        ),
      );

      let obj = {
        title,
        images,
        description,
        slug,
        serialization,
        author,
        artist,
        rating,
        status,
        type,
        genres,
        updatedOn,
      };
      console.log(JSON.stringify(obj, null, 2));

      return obj;
    } finally {
      // Optional: Code that always executes, regardless of error or success
      let chapterLinks = await textElements(
        driver,
        By.xpath(
          '//div[contains(@class, "pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative")]/a',
        ),
      );
      for (let i = 1; i < 4; i++) {
        // for (let i = 0; i < chapterLinks.length; i++) {
        // let button = await chapterLinks[i].findElement(By.xpath("./div"));

        let updatedOn = await textNormalElement(
          driver,
          By.xpath(
            `//div[contains(@class, "pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative")][${i}]/a/h3[2]`,
          ),
        );
        // let updatedOn = await chapterLinks[i]
        //   .findElement(By.xpath("./h3[2]"))
        //   .getText();

        // await button.click();
        await clickNormalElement(
          driver,
          By.xpath(
            `//div[contains(@class, "pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative")][${i}]/a/div`,
          ),
        );
        await driver.wait(until.urlContains("https://asuracomic.net"), 100000); // Wait for detail page to load

        // await driver.wait(until.elementsLocated(By.xpath('//div[contains(@class, "w-full mx-auto center")]/img[contains(@class, "object-cover mx-auto")]')), 100000);
        newChapterData.push(await parsePageChapterDetail(driver, updatedOn));

        await driver.navigate().back(); // Go back to the chater listing page
        await driver.wait(until.urlContains("https://asuracomic.net"), 10000); // Wait for listing page to reload
        // await driver.wait(
        //   until.elementLocated(
        //     By.xpath('//span[contains(@class, "text-xl font-bold")]'),
        //   ),
        //   10000,
        // );
        // Re-locate chapter links on the listing page after navigating back
        chapterLinks = await textElements(
          driver,
          By.xpath(
            '//div[contains(@class, "pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative")]/a',
          ),
        );
      }
      chapterData.push(...newChapterData);
    }
  } catch (error) {
    console.error("Error: Element not located within the timeout.", error);
  }
}

async function automateProcess(url) {
  await initializeDriver(); // Initialize driver once

  try {
    await performGet(driver, url);
    let currentPage = 1;
    let totalPages = 20; // Assume you know the total pages or can extract it

    while (currentPage <= totalPages) {
      console.log(`Scraping page ${currentPage}`);
      console.log("Current URL:", await driver.getCurrentUrl());

      // Find and process elements on the current page
      await parsePage(driver);

      // Navigate to the next page (if not the last page)
      if (currentPage < totalPages) {
        // await driver.wait(
        //   until.elementLocated(
        //     By.xpath(
        //       "//div[@class='flex items-center justify-center py-[15px] bg-[#222222] ']/a[2]",
        //     ),
        //   ),
        //   50000,
        // ); // Wait up to 5 seconds
        await clickElement(
          driver,
          By.xpath(
            "//div[@class='flex items-center justify-center py-[15px] bg-[#222222] ']/a[2]",
          ),
        );
        // await driver.wait(
        //   until.elementLocated(
        //     By.xpath(
        //       "//div[@class='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4']/a",
        //     ),
        //   ),
        //   10000,
        // ); // Wait for page to load
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
