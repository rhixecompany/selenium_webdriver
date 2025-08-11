import {WebDriver} from 'selenium-webdriver';
import {expect} from 'chai';
import {WebDriverManager} from './config/driver';
import {SeriesPage} from './pages/seriesPage';
import {HomePage} from './pages/homePage';

describe('Series Functionality', () => {
  let driver: WebDriver;
  let homePage: HomePage;
  let seriesPage: SeriesPage;
  before(async () => {
    driver = await WebDriverManager.getDriver();
  });
  after(async () => {
    await WebDriverManager.quitDriver();
  });
  beforeEach(async () => {
    seriesPage = new SeriesPage(driver);
    await seriesPage.navigateTo('https://asuracomic.net/series');
  });
  it('Should list libraries', async () => {
    try {
      let currentPage: number = 1;
      let totalPages: number = 20; // Assume you know the total pages or can extract it

      while (currentPage < totalPages) {
        homePage = await seriesPage.parsePage();
        console.log(`Current page ${currentPage}`);
        try {
          if (currentPage < totalPages) {
            await homePage.clickNextButton();
            const urlText = await driver.getCurrentUrl();
            expect(urlText).to.include('asuracomic');
            console.log('Current URL:', urlText);
          }
          currentPage++;
        } catch (error) {
          console.log('Error', error);
          break;
        }
      }
    } catch (error) {
      console.log('Error', error);
    }
  });
});
