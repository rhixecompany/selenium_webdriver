// utils/driver.ts
import {Builder, WebDriver, Browser, Capabilities} from 'selenium-webdriver';
import {Options} from 'selenium-webdriver/chrome';
import fs from 'fs';
import path from 'path';

let o: Options;

let userDataDir: fs.PathLike;
let driver: WebDriver;
export async function createDriver(
  headless: boolean = true
): Promise<WebDriver> {
  if (!driver) {
    o = new Options();
    // let __filename = fileURLToPath(import.meta.url);
    // let __dirname = dirname(__filename);
    const directoryName = 'chrome-profile';
    // eslint-disable-next-line no-undef
    const directoryPath = path.join(__dirname, '../', '../', directoryName); // Creates in the same directory as the script
    userDataDir = fs.mkdtempSync(directoryPath); // recursive: true creates parent directories if needed

    if (headless) {
      o.addArguments('--headless=new');
      o.addArguments('--disable-gpu');
      o.addArguments('--window-size=1920,1080');
    }
    o.addArguments(`--user-data-dir=${userDataDir}`);
    o.setPageLoadStrategy('normal');
    driver = await new Builder()
      .withCapabilities(Capabilities.chrome)
      .setChromeOptions(o)
      .build();
    // driver = await new Builder()
    //     // .forBrowser('chrome')
    //     .forBrowser(Browser.CHROME)
    //     .setChromeOptions(o)
    //     .build();
  }
  return driver;
}

export async function closeDriver(driver: WebDriver): Promise<void> {
  if (driver) {
    await driver.quit();
    driver = null as any; // Reset for subsequent tests
  }
  if (userDataDir) {
    fs.rmSync(userDataDir, {recursive: true, force: true});
    userDataDir = null as any;
  }
}
