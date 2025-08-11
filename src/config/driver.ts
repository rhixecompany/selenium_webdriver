import {Builder, WebDriver, Browser} from 'selenium-webdriver';
import {Options} from 'selenium-webdriver/chrome';
import fs from 'fs';
import path from 'path';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
let o: Options;

let userDataDir: fs.PathLike;
export class WebDriverManager {
  private static driver: WebDriver;
  public static async getDriver(): Promise<WebDriver> {
    if (!WebDriverManager.driver) {
      o = new Options();
      // let __filename = fileURLToPath(import.meta.url);
      // let __dirname = dirname(__filename);
      const directoryName = 'chrome-profile';
      // eslint-disable-next-line no-undef
      const directoryPath = path.join(__dirname, '../', '../', directoryName); // Creates in the same directory as the script
      userDataDir = fs.mkdtempSync(directoryPath); // recursive: true creates parent directories if needed
      // o.addArguments('--headless=new');
      o.addArguments(`--user-data-dir=${userDataDir}`);
      WebDriverManager.driver = await new Builder()
        // .forBrowser('chrome')
        .forBrowser(Browser.CHROME)
        .setChromeOptions(o)
        .build();
    }
    return WebDriverManager.driver;
  }

  public static async quitDriver(): Promise<void> {
    if (WebDriverManager.driver) {
      await WebDriverManager.driver.quit();
      WebDriverManager.driver = null as any; // Reset for subsequent tests
      fs.rmSync(userDataDir, {recursive: true, force: true});
      userDataDir = null as any;
    }
  }
}
