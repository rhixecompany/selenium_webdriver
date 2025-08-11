import { WebDriver, By, until } from 'selenium-webdriver';
import { BasePage } from './base.page';
import { HelperComponent } from './components/helperComponent';
import {
  comicTitle,
  comicImage,
  comicDescription,
  comicArtist,
  comicAuthor,
  comicRating,
  comicStatus,
  comicType,
  comicUpdatedon,
  comicSerialization,
  comicGenres,
  comicImage1,
  chapterImage,
  chapterName,
  chaptercomicSlug,
  chaptercomicTitle,
  comicChapters
} from '../utils/locators';
import fs from 'fs';
let comicData: any[] = [];
let chapterData: any[] = [];
export class SeriesPage extends BasePage {
  public helperComponent: HelperComponent;

  constructor(driver: WebDriver) {
    super(driver);
    this.helperComponent = new HelperComponent(driver);
  }

  public async displayComic(): Promise<any> {
    try {
      let comgenres: { name: string }[] = [];
      let gens = await this.findElements(By.xpath(comicGenres));
      gens &&
        gens.map(async (gen) => comgenres.push({ name: await gen.getText() }));
      let comic = {
        url: await this.driver.getCurrentUrl(),
        title: await (await this.findElement(By.xpath(comicTitle))).getText(),
        slug: (await this.driver.getCurrentUrl()).split('/')[4],
        images: [
          {
            url: await (
              await this.findElement(By.xpath(comicImage))
            ).getAttribute('src')
          },
          {
            url: (await (
              await this.findElement(By.xpath(comicImage1))
            ).isDisplayed())
              ? await (
                await this.findElement(By.xpath(comicImage1))
              ).getAttribute('src')
              : ''
          }
        ],
        description: (await (
          await this.findElement(By.xpath(comicDescription))
        ).isDisplayed())
          ? (
            await (
              await this.findElement(By.xpath(comicDescription))
            ).getText()
          )
            .replace(/(\r\n|\n|\r)/g, '')
            .trim()
          : '',
        rating: await (await this.findElement(By.xpath(comicRating))).getText(),
        status: await (await this.findElement(By.xpath(comicStatus))).getText(),
        updatedOn: await (
          await this.findElement(By.xpath(comicUpdatedon))
        ).getText(),
        serialization: await (
          await this.findElement(By.xpath(comicSerialization))
        ).getText(),
        type: {
          name: await (await this.findElement(By.xpath(comicType))).getText()
        },
        artist: {
          name: await (await this.findElement(By.xpath(comicArtist))).getText()
        },
        author: {
          name: await (await this.findElement(By.xpath(comicAuthor))).getText()
        },
        genres: comgenres
      };
      console.log(comic);
      return comic;
    } catch (error) {
      console.log(`Error in - ${error}`);
      let comgenres: { name: string }[] = [];
      let gens = await this.findElements(By.xpath(comicGenres));
      gens &&
        gens.map(async (gen) => comgenres.push({ name: await gen.getText() }));
      let comic = {
        url: await this.driver.getCurrentUrl(),
        title: await (await this.findElement(By.xpath(comicTitle))).getText(),
        slug: (await this.driver.getCurrentUrl()).split('/')[4],
        images: [
          {
            url: await (
              await this.findElement(By.xpath(comicImage))
            ).getAttribute('src')
          }
        ],
        // image1: { url: await this.findElement(By.xpath(comicImage1)).isDisplayed() ? await this.findElement(By.xpath(comicImage1)).getAttribute("src") : '' },
        description: (await (
          await this.findElement(
            By.xpath(
              '//div[contains(@class, "col-span-12 sm:col-span-9")]/span[contains(@class, "font-medium text-sm text-[#A2A2A2]")]'
            )
          )
        ).isDisplayed())
          ? (
            await (
              await this.findElement(
                By.xpath(
                  '//div[contains(@class, "col-span-12 sm:col-span-9")]/span[contains(@class, "font-medium text-sm text-[#A2A2A2]")]'
                )
              )
            ).getText()
          )
            .replace(/(\r\n|\n|\r)/g, '')
            .trim()
          : '',
        rating: await (await this.findElement(By.xpath(comicRating))).getText(),
        status: await (await this.findElement(By.xpath(comicStatus))).getText(),
        updatedOn: await (
          await this.findElement(By.xpath(comicUpdatedon))
        ).getText(),
        serialization: await (
          await this.findElement(By.xpath(comicSerialization))
        ).getText(),
        type: {
          name: await (await this.findElement(By.xpath(comicType))).getText()
        },
        artist: {
          name: await (await this.findElement(By.xpath(comicArtist))).getText()
        },
        author: {
          name: await (await this.findElement(By.xpath(comicAuthor))).getText()
        },
        genres: comgenres
      };
      console.log(comic);
      return comic;
    }
  }
  public async displayChapter(chapterupdatedon: string): Promise<any> {
    try {
      let chapterimgs: { url: string }[] = [];
      let imgs = await this.findElements(By.xpath(chapterImage));
      imgs.map(async (img) =>
        chapterimgs.push({ url: await img.getAttribute('src') })
      );
      let text = await (
        await this.findElement(By.xpath(chapterName))
      ).getText();
      let link = await this.findElement(By.xpath(chaptercomicSlug));
      let commaIndex = await text.indexOf('-'); // Find the index of the comma
      if (commaIndex !== -1) {
        // Check if the character exists
        let chapter = {
          url: await this.driver.getCurrentUrl(),
          name: await text.slice(0, commaIndex).trim(),
          title: await text.slice(commaIndex + 1).trim(),
          comictitle: await (
            await this.findElement(By.xpath(chaptercomicTitle))
          ).getText(),
          comicslug: await (await link.getAttribute('href')).split('/')[4],
          updatedOn: chapterupdatedon,
          images: chapterimgs
        };
        console.log(chapter);
        return chapter;
      } else {
        let link = await this.findElement(By.xpath(chaptercomicSlug));
        let chapter = {
          url: await this.driver.getCurrentUrl(),
          name: await (await this.findElement(By.xpath(chapterName))).getText(),
          comictitle: await (
            await this.findElement(By.xpath(chaptercomicTitle))
          ).getText(),
          comicslug: await (await link.getAttribute('href')).split('/')[4],
          updatedOn: chapterupdatedon,
          images: chapterimgs
        };
        console.log(chapter);
        return chapter;
      }
    } catch (error) {
      console.log(`Error in - ${error}`);

      let text = await (
        await this.findElement(By.xpath(chapterName))
      ).getText();
      let commaIndex = await text.indexOf('-'); // Find the index of the comma
      if (commaIndex !== -1) {
        let link = await this.findElement(By.xpath(chaptercomicSlug));
        // Check if the character exists
        let chapter = {
          url: await this.driver.getCurrentUrl(),
          name: await text.slice(0, commaIndex).trim(),
          title: await text.slice(commaIndex + 1).trim(),
          comictitle: await (
            await this.findElement(By.xpath(chaptercomicTitle))
          ).getText(),
          comicslug: await (await link.getAttribute('href')).split('/')[4],
          updatedOn: chapterupdatedon
        };
        console.log(chapter);
        return chapter;
      } else {
        let link = await this.findElement(By.xpath(chaptercomicSlug));
        let chapter = {
          url: await this.driver.getCurrentUrl(),
          name: await (await this.findElement(By.xpath(chapterName))).getText(),
          comictitle: await (
            await this.findElement(By.xpath(chaptercomicTitle))
          ).getText(),
          comicslug: await (await link.getAttribute('href')).split('/')[4],
          updatedOn: chapterupdatedon
        };
        console.log(chapter);
        return chapter;
      }
    }
  }

  public async navigateTo(url: string): Promise<void> {
    await this.driver.get(url); // Replace with your URL
  }

  public async getPage(): Promise<any> {
    try {
      let currentPage = 1;
      let totalPages = 20; // Assume you know the total pages or can extract it
      let enab: boolean = true
      while (enab && currentPage <= totalPages) {
        try {
          // let comics = await this.findElements(this.helperComponent.comicList);
          // for (let i = 0; i < comics.length; i++) {
          //   await comics[i].click();
          //   comicData.push(await this.displayComic());

          //   let chapters = await this.findElements(By.xpath(comicChapters));
          //   // for (let i = 0; i < 2; i++) {
          //   for (let i = 1; i < chapters.slice(0, 3).length; i++) {
          //     const chapterupdatedon = await (
          //       await this.findElement(
          //         By.xpath(
          //           `//div[contains(@class, "pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative")][${i}]/a/h3[2]`
          //         )
          //       )
          //     ).getText();
          //     await this.driver.wait(
          //       until.elementLocated(
          //         By.xpath(
          //           `//div[contains(@class, "pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative")][${i}]/a/div`
          //         )
          //       ),
          //       100000
          //     );
          //     await (
          //       await this.findElement(
          //         By.xpath(
          //           `//div[contains(@class, "pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative")][${i}]/a/div`
          //         )
          //       )
          //     ).click();

          //     chapterData.push(await this.displayChapter(chapterupdatedon));
          //     await this.driver.navigate().back();
          //     chapters = await this.findElements(By.xpath(comicChapters));
          //   }

          //   await this.driver.navigate().back();
          //   comics = await this.findElements(this.helperComponent.comicList);
          // }
          enab = await this.check(this.helperComponent.nextButton)
          if (enab && currentPage < totalPages) {
            console.log(`Scraping page ${currentPage}`);
            console.log('Current URL:', await this.driver.getCurrentUrl());
            await this.click(this.helperComponent.nextButton)
            currentPage++;
          }

        } catch (error) {
          console.log(error)
          break
        }

      }
    } catch (error) {
      console.log('Error: Element not located within the timeout.', error);
    } finally {
      if (comicData.length > 0) {
        // Write comics object to file..
        fs.writeFileSync('./comics.json', JSON.stringify(comicData, null, 2));
        console.log(`Comics_count: ${comicData.length}`);
      } else {
        console.error('Comics Not Found');
      }
      if (chapterData.length > 0) {
        // Write chapters object to file..
        fs.writeFileSync(
          './chapters.json',
          JSON.stringify(chapterData, null, 2)
        );

        console.log(`Chapters_count: ${chapterData.length}`);
      } else {
        console.error('Chapters Not Found');
      }
    }
  }
}
