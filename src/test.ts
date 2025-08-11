import {WebDriver} from 'selenium-webdriver';
// import { expect } from 'chai';
import {WebDriverManager} from './utils/driver';
import {SeriesPage} from './pages/series.page';

let driver: WebDriver;
let seriesPage: SeriesPage;

describe('Series Functionality', () => {
  before(async () => {
    driver = await WebDriverManager.getDriver();
    seriesPage = new SeriesPage(driver);
  });

  after(async () => {
    await WebDriverManager.quitDriver();
  });

  it('Should list libraries', async () => {
    await seriesPage.navigateTo('https://asuracomic.net/series');
    // const currentUrl = await driver.getCurrentUrl();
    // console.log(currentUrl);
    return await seriesPage.getPage(); // Replace with valid credentials

    // expect(currentUrl).to.include('asuracomic'); // Assert successful series
  });

  // Add more test cases as needed
});
