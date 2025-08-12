import { WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { createDriver, closeDriver } from '../utils/driver';
import { SeriesPage } from '../pages/seriesPage';
import fs from 'fs';
import { Chapter, Comic } from '../../types';
let comics: Comic[] = [];
let chapters: Chapter[] = [];
describe('Series Functionality', () => {
  let driver: WebDriver;
  let seriesPage: SeriesPage;

  before(async () => {
    driver = await createDriver(true); // true for headless mode
    seriesPage = new SeriesPage(driver);
    await seriesPage.navigateTo('https://asuracomic.net/series');
  });
  after(async () => {
    await closeDriver(driver);
  });

  it('Should list libraries', async () => {
    try {
      let currentPage: number = 1;
      let totalPages: number = 3; // Assume you know the total pages or can extract it
      while (currentPage < totalPages) {
        let data = await seriesPage.getPage();
        comics.push(await data.comicData);
        chapters.push(await data.chapterData);
        console.log(JSON.stringify(await data.comicData, null, 2));
        console.log(JSON.stringify(await data.chapterData, null, 2));
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
  });
});
