import {WebDriver} from 'selenium-webdriver';
// import { expect } from 'chai';
import {WebDriverManager} from './utils/driver';
import {SeriesPage} from './pages/series.page';

let driver: WebDriver;
let seriesPage: SeriesPage;

async function automateProcess() {
  try {
    driver = await WebDriverManager.getDriver();
    seriesPage = new SeriesPage(driver);
    await seriesPage.navigateTo('https://asuracomic.net/series');
    return await seriesPage.getPage(); // Replace with valid
  } catch (error) {
    console.log(error);
  } finally {
    await WebDriverManager.quitDriver();
  }
}
automateProcess();
