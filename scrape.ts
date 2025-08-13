import { WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { createDriver, closeDriver } from './utils/driver';
import { SeriesPage } from './pages/seriesPage';
import fs from 'fs';
import { Chapter, Comic } from './types';
const comics: Comic[] = [];
const chapters: Chapter[] = [];
let driver: WebDriver;
let seriesPage: SeriesPage;
async function automateProcess(url: string) {
  try {
    driver = await createDriver(true); // true for headless mode
    seriesPage = new SeriesPage(driver);
    await seriesPage.navigateTo(url);
    const urlText = await driver.getCurrentUrl();
    expect(urlText).to.include('page');
    console.log('Current URL:', urlText);
    let clickNext: boolean | undefined = true;
    while (clickNext) {
      const data = await seriesPage.parsePage();
      for (let i = 0; i < data.comicData.length; i++) {
        comics.push({
          ...data.comicData[i]
        });
      }
      for (let i = 0; i < data.chapterData.length; i++) {
        chapters.push({
          ...data.chapterData[i]
        });
      }
      try {
        clickNext = await seriesPage.checkNextButton();
        if (clickNext) {
          await seriesPage.clickNextButton();
          const urlText = await driver.getCurrentUrl();
          expect(urlText).to.include('page');
          console.log('Current URL:', urlText);
        }
      } catch {
        break
      }
    }
    if (comics.length > 0) {
      // Write await  object to file..
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
  } finally {
    await closeDriver(driver);
  }
}
const url = 'https://asuracomic.net/series?page=1'
automateProcess(url);
