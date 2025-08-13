import { WebDriver, By } from 'selenium-webdriver';
import { BasePage } from './basePage';
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
  comicChapters,
  nextButton
} from '../utils/locators';
import { Chapter, Comic } from '../types';
const comicData: Comic[] = [];
const chapterData: Chapter[] = [];
export class SeriesPage extends BasePage {
  private readonly comicList = By.xpath(comicItem);
  private readonly _comicGenres = By.xpath(comicGenres);
  private readonly _comicTitle = By.xpath(comicTitle);
  private readonly _comicImage = By.xpath(comicImage);
  private readonly _comicImage1 = By.xpath(comicImage1);
  private readonly _comicDescription = By.xpath(comicDescription);
  private readonly _comicArtist = By.xpath(comicArtist);
  private readonly _comicAuthor = By.xpath(comicAuthor);
  private readonly _comicRating = By.xpath(comicRating);
  private readonly _comicStatus = By.xpath(comicStatus);
  private readonly _comicType = By.xpath(comicType);
  private readonly _comicUpdatedon = By.xpath(comicUpdatedon);
  private readonly _comicChapters = By.xpath(comicChapters);
  private readonly _comicSerialization = By.xpath(comicSerialization);
  private readonly _chapterName = By.xpath(chapterName);
  private readonly _chapterImage = By.xpath(chapterImage);
  private readonly _chaptercomicTitle = By.xpath(chaptercomicTitle);
  private readonly _chaptercomicSlug = By.xpath(chaptercomicSlug);
  private readonly _nextButton = By.partialLinkText(nextButton);
  constructor(driver: WebDriver) {
    super(driver);
  }
  public async navigateTo(url: string) {
    await this.driver.get(url); // Replace with your URL
  }
  public async extractComic(): Promise<Comic> {
    try {
      const comgenres: { name: string }[] = [];
      const gens = await this.getAllElement(this._comicGenres);
      gens.map(async (gen) => comgenres.push({ name: await gen.getText() }));
      const comic = {
        url: await this.driver.getCurrentUrl(),
        title: await this.getText(this._comicTitle),
        slug: (await this.driver.getCurrentUrl()).split('/')[4],
        images: [
          {
            url: await this.getAttr(this._comicImage, 'src')
          },
          {
            url: await this.getOptAttr(this._comicImage1, 'src')
          }
        ],
        description: (await this.getText(this._comicDescription))
          .replace(/(\r\n|\n|\r)/g, '')
          .trim(),
        rating: await this.getText(this._comicRating),
        status: await this.getText(this._comicStatus),
        updatedOn: await this.getText(this._comicUpdatedon),
        serialization: await this.getText(this._comicSerialization),
        type: {
          name: await this.getText(this._comicType)
        },
        artist: {
          name: await this.getText(this._comicArtist)
        },
        author: {
          name: await this.getText(this._comicAuthor)
        },
        genres: comgenres
      };

      return comic;
    } catch (error) {
      console.log(`Error in - ${error}`);
      const comgenres: { name: string }[] = [];
      const gens = await this.getAllElement(this._comicGenres);
      gens.map(async (gen) => comgenres.push({ name: await gen.getText() }));
      const comic = {
        url: await this.driver.getCurrentUrl(),
        title: await this.getText(this._comicTitle),
        slug: (await this.driver.getCurrentUrl()).split('/')[4],
        images: [
          {
            url: await this.getAttr(this._comicImage, 'src')
          }
        ],

        description: (
          await this.getText(
            By.xpath(
              '//div[contains(@class, "col-span-12 sm:col-span-9")]/span[contains(@class, "font-medium text-sm text-[#A2A2A2]")]'
            )
          )
        )
          .replace(/(\r\n|\n|\r)/g, '')
          .trim(),
        rating: await this.getText(this._comicRating),
        status: await this.getText(this._comicStatus),
        updatedOn: await this.getText(this._comicUpdatedon),
        serialization: await this.getText(this._comicSerialization),
        type: {
          name: await this.getText(this._comicType)
        },
        artist: {
          name: await this.getText(this._comicArtist)
        },
        author: {
          name: await this.getText(this._comicAuthor)
        },
        genres: comgenres
      };

      return comic;
    }
  }
  public async extractChapter(chapterupdatedon: string): Promise<Chapter> {
    try {
      const chapterimgs: { url: string }[] = [];
      const imgs = await this.getOpAllElement(this._chapterImage);
      imgs.map(async (img) =>
        chapterimgs.push({ url: await img.getAttribute('src') })
      );
      const text = await this.getText(this._chapterName);
      const link = await this.findElement(this._chaptercomicSlug);
      const commaIndex = text.indexOf('-'); // Find the index of the comma
      if (commaIndex !== -1) {
        // Check if the character exists
        const chapter = {
          url: await this.driver.getCurrentUrl(),
          name: text.slice(0, commaIndex).trim(),
          title: text.slice(commaIndex + 1).trim(),
          comic: {
            title: await this.getText(this._chaptercomicTitle),
            slug: (await link.getAttribute('href')).split('/')[4]
          },

          updatedOn: chapterupdatedon,
          images: chapterimgs
        };

        return chapter;
      } else {
        const link = await this.findElement(this._chaptercomicSlug);
        const chapter = {
          url: await this.driver.getCurrentUrl(),
          name: await this.getText(this._chapterName),
          comic: {
            title: await this.getText(this._chaptercomicTitle),
            slug: (await link.getAttribute('href')).split('/')[4]
          },

          updatedOn: chapterupdatedon,
          images: chapterimgs
        };

        return chapter;
      }
    } catch (error) {
      console.log(`Error in - ${error}`);

      const text = await this.getText(this._chapterName);
      const commaIndex = text.indexOf('-'); // Find the index of the comma
      if (commaIndex !== -1) {
        const link = await this.findElement(this._chaptercomicSlug);
        // Check if the character exists
        const chapter = {
          url: await this.driver.getCurrentUrl(),
          name: text.slice(0, commaIndex).trim(),
          title: text.slice(commaIndex + 1).trim(),
          comic: {
            title: await this.getText(this._chaptercomicTitle),
            slug: (await link.getAttribute('href')).split('/')[4]
          },

          updatedOn: chapterupdatedon
        };

        return chapter;
      } else {
        const link = await this.findElement(this._chaptercomicSlug);
        const chapter = {
          url: await this.driver.getCurrentUrl(),
          name: await this.getText(this._chapterName),
          comic: {
            title: await this.getText(this._chaptercomicTitle),
            slug: (await link.getAttribute('href')).split('/')[4]
          },

          updatedOn: chapterupdatedon
        };

        return chapter;
      }
    }
  }

  public async parsePage(): Promise<{
    comicData: Comic[];
    chapterData: Chapter[];
  }> {
    try {
      let comics = await this.getAllElement(this.comicList);
      // for (let i = 0; i < comics.slice(1, 2).length; i++) {
      for (let i = 0; i < comics.length; i++) {
        const element = comics[i];
        await element.click();
        const comic = await this.extractComic();

        comicData.push(comic);
        // console.log(comic);
        let chapters = await this.getAllElement(this._comicChapters);
        // for (let i = 1; i < chapters.length; i++) {
        for (let i = 1; i < 6; i++) {
          const chapterupdatedon = await this.getText(
            By.xpath(
              `//div[contains(@class, "pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative")][${i}]/a/h3[2]`
            )
          );
          await this.clickElement(
            By.xpath(
              `//div[contains(@class, "pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative")][${i}]/a/div`
            )
          );
          const chapter = await this.extractChapter(chapterupdatedon);
          chapterData.push(chapter);
          // console.log(chapter);
          await this.driver.navigate().back();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          chapters = await this.getAllElement(this._comicChapters);
        }
        await this.driver.navigate().back();
        comics = await this.getAllElement(this.comicList);
      }
      const items = {
        comicData: comicData,
        chapterData: chapterData
      };
      console.log(JSON.stringify(items, null, 2))
      return items;
    } catch (error) {
      console.log('Error: Element not located within the timeout.', error);
      const items = {
        comicData: comicData,
        chapterData: chapterData
      };
      console.log(JSON.stringify(items, null, 2))
      return items;
    }
  }
  public async checkNextButton(): Promise<boolean | undefined> {
    return (await this.findElement(this._nextButton)).isEnabled()
  }
  public async clickNextButton(): Promise<void> {
    // return await this.clickElement(this._nextButton);
    return await this.handleStaleElement(this._nextButton, this.actionElement)
  }
}
