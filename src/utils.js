import { By, until } from "selenium-webdriver";

import assert from "node:assert";

export async function exampleExplicitWait(driver) {
  // Wait for an element to be visible
  let element = await driver.wait(
    until.elementLocated(By.id("myElementId")),
    10000,
  );
  await driver.wait(until.elementIsVisible(element), 5000);

  // Wait for an element to be clickable
  let clickableElement = await driver.wait(
    until.elementToBeClickable(By.css(".myButtonClass")),
    10000,
  );
  await clickableElement.click();
}

export async function safeClick(driver, locator, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      let element = await driver.findElement(locator);
      await element.click();
      return; // Success, exit the loop
    } catch (error) {
      if (error.name === "StaleElementReferenceError") {
        console.warn(
          `Stale element reference encountered, retrying... (${i + 1}/${maxRetries})`,
        );
        await driver.sleep(500); // Small delay before retrying
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
  throw new Error(`Failed to click element after ${maxRetries} retries.`);
}

export async function performGet(driver, url) {
  await driver.get(url);
  await driver.wait(
    until.elementLocated(
      By.xpath(
        "//div[@class='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4']/a",
      ),
    ),
    10000,
  ); // Wait for page to load
  assert.equal("Series - Asura Scans", await driver.getTitle());
}

export async function clickNormalElement(driver, locator, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      let element = await driver.findElement(locator); // Wait up to 5 seconds
      if (await element.isEnabled()) {
        return await element.click();
      } else {
        return false;
      }
    } catch (error) {
      if (error.name === "StaleElementReferenceError") {
        console.warn(
          `Stale element reference encountered, retrying... (${i + 1}/${maxRetries})`,
        );
        // await driver.sleep(500); // Small delay before retrying
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
  throw new Error(`Failed to click element after ${maxRetries} retries.`);
}
export async function clickElement(driver, locator, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      let element = await driver.findElement(locator); // Wait up to 5 seconds
      if (await element.isEnabled()) {
        return await element.click();
      } else {
        return false;
      }
    } catch (error) {
      if (error.name === "StaleElementReferenceError") {
        console.warn(
          `Stale element reference encountered, retrying... (${i + 1}/${maxRetries})`,
        );
        await driver.sleep(500); // Small delay before retrying
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
  throw new Error(`Failed to click element after ${maxRetries} retries.`);
}
export async function textareaElement(driver, locator, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      let element = await driver.findElement(locator).getText();

      return await element.replace(/(\r\n|\n|\r)/g, "").trim();
    } catch (error) {
      if (error.name === "StaleElementReferenceError") {
        console.warn(
          `Stale element reference encountered, retrying... (${i + 1}/${maxRetries})`,
        );
        await driver.sleep(500); // Small delay before retrying
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
  throw new Error(`Failed to get textareaElement after ${maxRetries} retries.`);
}
export async function textNormalElement(driver, locator, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      let element = await driver.findElement(locator); // Wait up to 5 seconds
      return await element.getText();
    } catch (error) {
      if (error.name === "StaleElementReferenceError") {
        console.warn(
          `Stale element reference encountered, retrying... (${i + 1}/${maxRetries})`,
        );
        // await driver.sleep(500); // Small delay before retrying
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
  throw new Error(`Failed to get textElement after ${maxRetries} retries.`);
}
export async function textElement(driver, locator, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      let element = await driver.findElement(locator); // Wait up to 5 seconds
      return await element.getText();
    } catch (error) {
      if (error.name === "StaleElementReferenceError") {
        console.warn(
          `Stale element reference encountered, retrying... (${i + 1}/${maxRetries})`,
        );
        await driver.sleep(500); // Small delay before retrying
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
  throw new Error(`Failed to get textElement after ${maxRetries} retries.`);
}
export async function imageElement(driver, locator, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      let element = await driver.findElement(locator); // Wait up to 5 seconds
      return await element.getAttribute("src");
    } catch (error) {
      if (error.name === "StaleElementReferenceError") {
        console.warn(
          `Stale element reference encountered, retrying... (${i + 1}/${maxRetries})`,
        );
        await driver.sleep(500); // Small delay before retrying
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
  throw new Error(`Failed to get imageElement after ${maxRetries} retries.`);
}
export async function hrefElement(driver, locator, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      let element = await driver.findElement(locator); // Wait up to 5 seconds
      return await element.getAttribute("href");
    } catch (error) {
      if (error.name === "StaleElementReferenceError") {
        console.warn(
          `Stale element reference encountered, retrying... (${i + 1}/${maxRetries})`,
        );
        await driver.sleep(500); // Small delay before retrying
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
  throw new Error(`Failed to get hrefElement after ${maxRetries} retries.`);
}
export async function textElements(driver, locator, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      let element = await driver.findElements(locator); // Wait up to 5 seconds
      return await element;
    } catch (error) {
      if (error.name === "StaleElementReferenceError") {
        console.warn(
          `Stale element reference encountered, retrying... (${i + 1}/${maxRetries})`,
        );
        await driver.sleep(500); // Small delay before retrying
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
  throw new Error(`Failed to get textElements after ${maxRetries} retries.`);
}
