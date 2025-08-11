import {By, WebDriver, WebElement} from 'selenium-webdriver';
import {comicItem, nextButton} from '../../utils/locators';
export class HelperComponent {
  private driver: WebDriver;
  // private readonly homeLinkLocator = By.css('nav a[href="/"]');
  public comicList = By.xpath(comicItem);
  public nextButton = By.xpath(nextButton);

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  public async getHomeLink(txt: any): Promise<WebElement> {
    return await this.driver.findElement(txt);
  }
}
