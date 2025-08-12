export interface Comic {
  url: string;
  title: string;
  images: ComicImage[];
  description: string;
  slug: string;
  serialization: string;
  author: Author;
  artist: Artist;
  rating: string;
  status: string;
  type: Type;
  genres: Genre[];
  updatedOn: string;
}

export interface Genre {
  name: string;
}
export interface Type {
  name: string;
}
export interface Author {
  name: string;
}
export interface Artist {
  name: string;
}

export interface ComicImage {
  url: string;
}

interface ChapterComic {
  title: string;
  slug: string;
}

export interface Chapter {
  url: string;
  name: string;
  images?: ChapterImage[];
  comic: ChapterComic;
  updatedOn: string;
  title?: string;
}

export interface ChapterImage {
  url: string;
}
