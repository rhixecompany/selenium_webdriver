import { WebDriver, WebElement, until } from 'selenium-webdriver';

export class CustomWaits {
  public static async waitForElementToBeVisibleAndStable(
    driver: WebDriver,
    locator: any,
    timeout: number = 10000
  ): Promise<WebElement> {
    try {
      await driver.wait(until.elementLocated(locator), timeout);
      return driver.findElement(locator);
    } catch (error: any) {
      // Re-attempt to find the element if it became stale during initial location
      if (error.message.includes('stale element reference')) {
        console.log(
          'Stale element reference encountered, re-locating element.'
        );
        await driver.wait(until.elementLocated(locator), timeout);
        return driver.findElement(locator);
      }
      throw error;
    }
  }
  public static async waitForElementsToBeVisibleAndStable(
    driver: WebDriver,
    locator: any,
    timeout: number = 1000
  ): Promise<WebElement[]> {
    try {
      await driver.wait(until.elementLocated(locator), timeout);
      return driver.findElements(locator);
    } catch (error: any) {
      // Re-attempt to find the element if it became stale during initial location
      if (error.message.includes('stale element reference')) {
        console.log(
          'Stale element reference encountered, re-locating element.'
        );
        await driver.wait(until.elementLocated(locator), timeout);
        return driver.findElements(locator);
      }
      throw error;
    }
  }

  public static async waitForElementToBeClickable(
    driver: WebDriver,
    locator: any,
    timeout: number = 10000
  ): Promise<boolean> {
    const element = await CustomWaits.waitForElementToBeVisibleAndStable(
      driver,
      locator,
      timeout
    );
    return await element.isEnabled()
    // return await driver.wait(until.elementIsEnabled(element), timeout); // Ensure visibility after locating
  }
}
