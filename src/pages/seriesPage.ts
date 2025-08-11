import { WebDriver, By } from 'selenium-webdriver';
import { BasePage } from './basePage';
import { HomePage } from './homePage'; // Nested POM example
import {
  comicItem,
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
} from '../config/locators';
import fs from 'fs';
let comicData: any[] = [];
let chapterData: any[] = [];
export class SeriesPage extends BasePage {
  private comicList = By.xpath(comicItem);
  private _comicGenres = By.xpath(comicGenres);
  private _comicTitle = By.xpath(comicTitle);
  private _comicImage = By.xpath(comicImage);
  private _comicImage1 = By.xpath(comicImage1);
  private _comicDescription = By.xpath(comicDescription);
  private _comicArtist = By.xpath(comicArtist);
  private _comicAuthor = By.xpath(comicAuthor);
  private _comicRating = By.xpath(comicRating);
  private _comicStatus = By.xpath(comicStatus);
  private _comicType = By.xpath(comicType);
  private _comicUpdatedon = By.xpath(comicUpdatedon);
  private _comicChapters = By.xpath(comicChapters);
  private _comicSerialization = By.xpath(comicSerialization);
  private _chapterName = By.xpath(chapterName);
  private _chapterImage = By.xpath(chapterImage);
  private _chaptercomicTitle = By.xpath(chaptercomicTitle);
  private _chaptercomicSlug = By.xpath(chaptercomicSlug);

  constructor(driver: WebDriver) {
    super(driver);
  }

  public async navigateTo(url: string) {
    await this.driver.get(url); // Replace with your URL
  }

  public async displayComic(): Promise<any> {
    try {
      let comgenres: { name: string }[] = [];
      let gens = await this.getElements(this._comicGenres);
      gens &&
        gens.map(async (gen) => comgenres.push({ name: await gen.getText() }));
      let comic = {
        url: await this.driver.getCurrentUrl(),
        title: await this.getElement(this._comicTitle),
        slug: (await this.driver.getCurrentUrl()).split('/')[4],
        images: [
          {
            url: await this.getImageElement(this._comicImage)
          },
          {
            url: (await (
              await this.driver.findElement(this._comicImage1)
            ).isDisplayed())
              ? await this.getImageElement(this._comicImage1)
              : ''
          }
        ],
        description: (await (
          await this.driver.findElement(this._comicDescription)
        ).isDisplayed())
          ? (await this.getElement(this._comicDescription))
            .replace(/(\r\n|\n|\r)/g, '')
            .trim()
          : '',
        rating: await this.getElement(this._comicRating),
        status: await this.getElement(this._comicStatus),
        updatedOn: await this.getElement(this._comicUpdatedon),
        serialization: await this.getElement(this._comicSerialization),
        type: {
          name: await this.getElement(this._comicType)
        },
        artist: {
          name: await this.getElement(this._comicArtist)
        },
        author: {
          name: await this.getElement(this._comicAuthor)
        },
        genres: comgenres
      };

      return comic;
    } catch (error) {
      console.log(`Error in - ${error}`);
      let comgenres: { name: string }[] = [];
      let gens = await this.getElements(this._comicGenres);
      gens &&
        gens.map(async (gen) => comgenres.push({ name: await gen.getText() }));
      let comic = {
        url: await this.driver.getCurrentUrl(),
        title: await this.getElement(this._comicTitle),
        slug: (await this.driver.getCurrentUrl()).split('/')[4],
        images: [
          {
            url: await this.getImageElement(this._comicImage)
          }
        ],

        description: (await (
          await this.driver.findElement(
            By.xpath(
              '//div[contains(@class, "col-span-12 sm:col-span-9")]/span[contains(@class, "font-medium text-sm text-[#A2A2A2]")]'
            )
          )
        ).isDisplayed())
          ? (
            await this.getElement(
              By.xpath(
                '//div[contains(@class, "col-span-12 sm:col-span-9")]/span[contains(@class, "font-medium text-sm text-[#A2A2A2]")]'
              )
            )
          )
            .replace(/(\r\n|\n|\r)/g, '')
            .trim()
          : '',
        rating: await this.getElement(this._comicRating),
        status: await this.getElement(this._comicStatus),
        updatedOn: await this.getElement(this._comicUpdatedon),
        serialization: await this.getElement(this._comicSerialization),
        type: {
          name: await this.getElement(this._comicType)
        },
        artist: {
          name: await this.getElement(this._comicArtist)
        },
        author: {
          name: await this.getElement(this._comicAuthor)
        },
        genres: comgenres
      };

      return comic;
    }
  }
  public async displayChapter(chapterupdatedon: string): Promise<any> {
    try {
      let chapterimgs: { url: string }[] = [];
      let imgs = await this.getElements(this._chapterImage);
      imgs.map(async (img) =>
        chapterimgs.push({ url: await img.getAttribute('src') })
      );
      let text = await this.getElement(this._chapterName);
      let link = await this.findElement(this._chaptercomicSlug);
      let commaIndex = text.indexOf('-'); // Find the index of the comma
      if (commaIndex !== -1) {
        // Check if the character exists
        let chapter = {
          url: await this.driver.getCurrentUrl(),
          name: text.slice(0, commaIndex).trim(),
          title: text.slice(commaIndex + 1).trim(),
          comictitle: await this.getElement(this._chaptercomicTitle),
          comicslug: (await link.getAttribute('href')).split('/')[4],
          updatedOn: chapterupdatedon,
          images: chapterimgs
        };

        return chapter;
      } else {
        let link = await this.findElement(this._chaptercomicSlug);
        let chapter = {
          url: await this.driver.getCurrentUrl(),
          name: await this.getElement(this._chapterName),
          comictitle: await this.getElement(this._chaptercomicTitle),
          comicslug: (await link.getAttribute('href')).split('/')[4],
          updatedOn: chapterupdatedon,
          images: chapterimgs
        };

        return chapter;
      }
    } catch (error) {
      console.log(`Error in - ${error}`);

      let text = await this.getElement(this._chapterName);
      let commaIndex = text.indexOf('-'); // Find the index of the comma
      if (commaIndex !== -1) {
        let link = await this.findElement(this._chaptercomicSlug);
        // Check if the character exists
        let chapter = {
          url: await this.driver.getCurrentUrl(),
          name: text.slice(0, commaIndex).trim(),
          title: text.slice(commaIndex + 1).trim(),
          comictitle: await this.getElement(this._chaptercomicTitle),
          comicslug: (await link.getAttribute('href')).split('/')[4],
          updatedOn: chapterupdatedon
        };

        return chapter;
      } else {
        let link = await this.findElement(this._chaptercomicSlug);
        let chapter = {
          url: await this.driver.getCurrentUrl(),
          name: await this.getElement(this._chapterName),
          comictitle: await this.getElement(this._chaptercomicTitle),
          comicslug: (await link.getAttribute('href')).split('/')[4],
          updatedOn: chapterupdatedon
        };

        return chapter;
      }
    }
  }

  public async parsePage(): Promise<any> {
    try {
      let comics = await this.getElements(this.comicList);
      for (let i = 0; i < comics.length; i++) {
        const element = comics[i];
        await element.click();
        let comic = await this.displayComic();
        comicData.push(comic);
        console.log(comic);
        let chapters = await this.getElements(this._comicChapters);
        for (let i = 1; i < chapters.slice(0, 4).length; i++) {
          const chapterupdatedon = await this.getElement(
            By.xpath(
              `//div[contains(@class, "pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative")][${i}]/a/h3[2]`
            )
          );
          await this.waitForElementAndClick(
            By.xpath(
              `//div[contains(@class, "pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative")][${i}]/a/div`
            )
          );

          let chapter = await this.displayChapter(chapterupdatedon);
          chapterData.push(chapter);
          console.log(chapter);
          await this.driver.navigate().back();
          chapters = await this.getElements(this._comicChapters);
        }
        await this.driver.navigate().back();
        comics = await this.getElements(this.comicList);
      }
      return new HomePage(this.driver);
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
