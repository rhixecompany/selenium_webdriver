import { WebDriver } from 'selenium-webdriver';
import { CustomWaits } from '../utils/waits';

export class BasePage {
  protected driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  protected async findElement(locator: any): Promise<any> {
    return CustomWaits.waitForElementToBeVisibleAndStable(this.driver, locator);
  }
  protected async findElements(locator: any): Promise<any[]> {
    return CustomWaits.waitForElementsToBeVisibleAndStable(
      this.driver,
      locator
    );
  }

  protected async check(locator: any): Promise<boolean> {
    return await CustomWaits.waitForElementToBeClickable(
      this.driver,
      locator
    );
  }
  protected async click(locator: any): Promise<void> {
    await this.check(locator);
    const element = await this.findElement(locator);
    return element.click();
  }
  protected async enterText(locator: any, text: string): Promise<void> {
    const element = await this.findElement(locator);
    return await element.sendKeys(text);
  }
}
