import {WebDriver} from 'selenium-webdriver';
import {expect} from 'chai';
import {createDriver, closeDriver} from './utils/driver';
import {SeriesPage} from './pages/seriesPage';
import fs from 'fs';
import {Chapter, Comic} from './../types';
let comics: Comic[] = [];
let chapters: Chapter[] = [];
let driver: WebDriver;
let seriesPage: SeriesPage;
async function automateProcess() {
  try {
    driver = await createDriver(true); // true for headless mode
    seriesPage = new SeriesPage(driver);
    await seriesPage.navigateTo('https://asuracomic.net/series');
    try {
      let currentPage: number = 1;
      let totalPages: number = 20; // Assume you know the total pages or can extract it
      while (currentPage < totalPages) {
        let data = await seriesPage.getPage();
        comics.push(data.comicData);
        chapters.push(data.chapterData);
        console.log(JSON.stringify(data.comicData, null, 2));
        console.log(JSON.stringify(data.chapterData, null, 2));
        console.log(`Current page ${currentPage}`);
        try {
          if (currentPage < totalPages) {
            await seriesPage.clickNextButton();
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
      console.log(error);
    } finally {
      if (comics.length > 0) {
        // Write comics object to file..
        fs.writeFileSync('./comics.json', JSON.stringify(comics, null, 2));
        console.log(`Comics_count: ${comics.length}`);
      } else {
        console.error('Comics Not Found');
      }
      if (chapters.length > 0) {
        // Write chapters object to file..
        fs.writeFileSync('./chapters.json', JSON.stringify(chapters, null, 2));

        console.log(`Chapters_count: ${chapters.length}`);
      } else {
        console.error('Chapters Not Found');
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    await closeDriver(driver);
  }
}
automateProcess();
