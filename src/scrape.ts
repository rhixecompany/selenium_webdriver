import {WebDriver} from 'selenium-webdriver';
import {expect} from 'chai';
import {WebDriverManager} from './config/driver';
import {SeriesPage} from './pages/seriesPage';
import {HomePage} from './pages/homePage';

let driver: WebDriver;
let homePage: HomePage;
let seriesPage: SeriesPage;

async function automateProcess() {
  try {
    driver = await WebDriverManager.getDriver();
    seriesPage = new SeriesPage(driver);
    await seriesPage.navigateTo('https://asuracomic.net/series');
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
  } catch (error) {
    console.log(error);
  } finally {
    await WebDriverManager.quitDriver();
  }
}
automateProcess();
