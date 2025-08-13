// pages/basePage.ts
import { WebDriver, WebElement, By, until } from 'selenium-webdriver';

export abstract class BasePage {
  protected driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  protected async findElement(locator: By): Promise<WebElement> {
    try {
      await this.driver.wait(until.elementLocated(locator), 1000);
      return await this.driver.findElement(locator);
    } catch (error) {
      console.error(`Error finding element with locator ${locator}:`, error);
      throw error;
    }
  }

  protected async clickElement(locator: By): Promise<void> {
    const element = await this.findElement(locator);
    await element.click();
  }
  protected async actionElement(element: WebElement): Promise<void> {
    await element.click();
  }

  protected async enterText(locator: By, text: string): Promise<void> {
    const element = await this.findElement(locator);
    await element.sendKeys(text);
  }

  protected async getText(locator: By): Promise<string> {
    const element = await this.findElement(locator);
    return await element.getText();
  }
  protected async getAttr(locator: By, text: string): Promise<string> {
    const element = await this.findElement(locator);
    return await element.getAttribute(text);
  }
  protected async getOptAttr(locator: By, text: string): Promise<string> {
    const element = await this.driver.findElement(locator);
    return await element.getAttribute(text);
  }
  protected async handleStaleElement(
    locator: By,
    action: (element: WebElement) => Promise<void>
  ): Promise<void> {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        const element = await this.findElement(locator);
        await action(element);
        return; // Success
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes('stale element reference')
        ) {
          console.warn(
            `Stale element encountered, retrying (${attempts + 1}/${maxAttempts})...`
          );
          attempts++;
          await this.driver.sleep(1000); // Wait before retrying
        } else {
          throw error; // Re-throw other errors
        }
      }
    }
    throw new Error(
      `Failed to interact with element after ${maxAttempts} attempts due to stale element.`
    );
  }
  protected async getAllElement(locator: By): Promise<WebElement[]> {
    try {
      await this.driver.wait(until.elementLocated(locator), 1000);
      return await this.driver.findElements(locator);
    } catch (error) {
      console.error(`Error finding elements with locator ${locator}:`, error);
      throw error;
    }
  }
  protected async getOpAllElement(locator: By): Promise<WebElement[]> {
    await this.driver.wait(until.elementLocated(locator), 2000);
    return await this.driver.findElements(locator);
  }
}
