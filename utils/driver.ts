// utils/driver.ts
import { Builder, WebDriver, Browser, Capabilities } from 'selenium-webdriver';
import { Options, ServiceBuilder } from 'selenium-webdriver/chrome';
import fs from 'fs';
import path, { dirname } from 'path';
import 'chromedriver'; // Ensure ChromeDriver is loaded
import { fileURLToPath } from 'url';
let o: Options;
let s: ServiceBuilder;
let userDataDir: fs.PathLike;
let driver: WebDriver;
export async function createDriver(
  headless: boolean = true
): Promise<WebDriver> {
  if (!driver) {
    o = new Options();
    s = new ServiceBuilder();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const directoryName = 'chrome-profile';

    const directoryPath = path.join(__dirname, '../', directoryName); // Creates in the same directory as the script
    userDataDir = fs.mkdtempSync(directoryPath); // recursive: true creates parent directories if needed

    if (headless) {
      o.addArguments('--headless=new');
      o.addArguments('--disable-gpu');
      o.addArguments('--window-size=1920,1080');
    }
    o.addArguments(`--user-data-dir=${userDataDir}`);
    o.addArguments('--no-sandbox');
    o.addArguments('--disable-dev-shm-usage');
    o.setPageLoadStrategy('normal');
    driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(o)
      .setChromeService(s)
      .build();
    // driver = await new Builder()
    //   .withCapabilities(Capabilities.chrome)
    //   .setChromeOptions(o)
    //   .build();
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
    fs.rmSync(userDataDir, { recursive: true, force: true });
    userDataDir = null as any;
  }
}
