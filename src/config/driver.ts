import {Builder, WebDriver, Browser} from 'selenium-webdriver';
import {Options, ServiceBuilder} from 'selenium-webdriver/chrome';
import fs from 'fs';
import path from 'path';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
let o: Options;

let s: ServiceBuilder;
let userDataDir: fs.PathLike;
export class WebDriverManager {
  private static driver: WebDriver;

  public static async getDriver(): Promise<WebDriver> {
    if (!WebDriverManager.driver) {
      o = new Options();
      // let __filename = fileURLToPath(import.meta.url);
      // let __dirname = dirname(__filename);

      let directoryName = 'chrome-profile';
      let directoryPath = path.join(__dirname, '../', '../', directoryName); // Creates in the same directory as the script

      userDataDir = fs.mkdtempSync(directoryPath); // recursive: true creates parent directories if needed

      o.addArguments(`--user-data-dir=${userDataDir}`);
      o.addArguments('disable-infobars');
      // o.addArguments('--no-sandbox');
      // o.addArguments('--disable-dev-shm-usage');
      o.addArguments('--headless=new');
      // o.addArguments("--disable-gpu"); // Recommended for headless
      // o.addArguments("--enable-unsafe-swiftshader");
      // o.excludeSwitches("enable-automation");
      // o.setAcceptInsecureCerts(true);
      o.setUserPreferences({credentials_enable_service: false});
      // o.setPageLoadStrategy('normal');
      s = new ServiceBuilder();
      WebDriverManager.driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(o)
        .setChromeService(s)

        .build();
    }
    return WebDriverManager.driver;
  }

  public static async quitDriver(): Promise<void> {
    if (WebDriverManager.driver) {
      await WebDriverManager.driver.quit();
      WebDriverManager.driver = null as any; // Reset for subsequent tests
      await fs.rmSync(userDataDir, {recursive: true, force: true});
    }
  }
}
