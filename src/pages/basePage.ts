// pages/basePage.ts
import {WebDriver, By, until} from 'selenium-webdriver';

export abstract class BasePage {
  protected driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  protected async getElement(locator: By, timeout: number = 5000) {
    await this.driver.wait(until.elementLocated(locator), timeout);
    const element = await this.driver.findElement(locator);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return await element.getText();
  }
  protected async findElement(locator: By, timeout: number = 5000) {
    await this.driver.wait(until.elementLocated(locator), timeout);
    const element = await this.driver.findElement(locator);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return await element;
  }
  protected async getImageElement(locator: By, timeout: number = 5000) {
    await this.driver.wait(until.elementLocated(locator), timeout);
    const element = await this.driver.findElement(locator);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return await element.getAttribute('src');
  }
  protected async getElements(locator: By, timeout: number = 5000) {
    await this.driver.wait(until.elementsLocated(locator), timeout);
    return await this.driver.findElements(locator);
  }
  protected async waitForElementAndClick(locator: By, timeout: number = 5000) {
    await this.driver.wait(until.elementLocated(locator), timeout);
    const element = await this.driver.findElement(locator);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return await element.click();
  }

  protected async customWaitUntilStale(locator: By, timeout: number = 5000) {
    const element = await this.driver.findElement(locator);
    return await this.driver.wait(until.stalenessOf(element), timeout);
  }
}
