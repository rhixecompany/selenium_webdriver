// pages/homePage.ts
import {WebDriver, By, until} from 'selenium-webdriver';
import {BasePage} from './basePage';
import {nextButton} from '../config/locators';
export class HomePage extends BasePage {
  private nextButton = By.partialLinkText(nextButton);
  constructor(driver: WebDriver) {
    super(driver);
  }
  // public async checkNextButton(): Promise<boolean> {
  //     const element = await this.driver.findElement(this.nextButton);
  //     await this.driver.wait(until.elementIsEnabled(element), 50000);
  //     if (await this.driver.wait(until.elementIsEnabled(element), 50000)) {
  //         return true
  //     } else {
  //         return false
  //     }
  // }
  public async clickNextButton(): Promise<void> {
    const element = await this.driver.findElement(this.nextButton);
    await this.driver.wait(until.elementIsEnabled(element), 50000);
    return element.click();
  }
}
