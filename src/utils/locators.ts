// Series Page
export const comicItem =
  "//div[@class='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4']/a/div";
export const nextButton =
  "//div[@class='flex items-center justify-center py-[15px] bg-[#222222] ']/a[2]";

// Comic Page
export const comicTitle = '//span[contains(@class, "text-xl font-bold")]';
export const comicSerialization =
  "//div[@class='grid grid-cols-1 md:grid-cols-2 gap-5 mt-8']/div[1]/h3[2]";
export const comicAuthor =
  "//div[@class='grid grid-cols-1 md:grid-cols-2 gap-5 mt-8']/div[2]/h3[2]";
export const comicArtist =
  "//div[@class='grid grid-cols-1 md:grid-cols-2 gap-5 mt-8']/div[3]/h3[2]";
export const comicRating = '//span[contains(@class, "ml-1 text-xs")]';
export const comicStatus =
  "//div[@class='bg-[#343434] px-2 py-2 flex items-center justify-between rounded-[3px] w-full'][1]/h3[2]";
export const comicUpdatedon =
  "//div[@class='grid grid-cols-1 md:grid-cols-2 gap-5 mt-8']/div[5]/h3[2]";
export const comicType =
  "//div[@class='bg-[#343434] px-2 py-2 flex items-center justify-between rounded-[3px] w-full'][2]/h3[2]";
export const comicGenres =
  "//div[@class='flex flex-row flex-wrap gap-3']/button";
export const comicImage =
  '//div[contains(@class, "relative col-span-full")]/img[contains(@class, "rounded mx-auto")]';
export const comicImage1 =
  '//div[contains(@class, "bigcover")]/img[contains(@data-nimg, "1")]';
export const comicDescription =
  '/html/body/div[4]/div/div/div/div[1]/div/div[1]/div[1]/div[2]/div[2]/div[2]/span';
export const comicChapters =
  '//div[contains(@class, "pl-4 py-2 border rounded-md group w-full hover:bg-[#343434] cursor-pointer border-[#A2A2A2]/20 relative")]/a';

// Chapter Page
export const chapterName =
  '//button[contains(@class, "px-3 py-2 dropdown-btn")]/h2';
export const chapterImage =
  '//div[contains(@class, "w-full mx-auto center")]/img[contains(@class, "object-cover mx-auto")]';
export const chaptercomicTitle =
  "//div[@class='flex flex-col items-center space-y-2 pt-6 px-5 text-center']/p/a/span";
export const chaptercomicSlug =
  "//div[@class='flex flex-col items-center space-y-2 pt-6 px-5 text-center']/p/a";
