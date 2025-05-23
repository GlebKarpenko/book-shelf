import { FileSizeMetric } from "./Util"

export interface GoodreadsBook {
    bookId: string,
    title: string,
    workID: string,
    imageUrl: string,
    bookUrl: string,
    author: string,
    rank: number,
    rating: number,
    publishedYear: string
};

export interface AnnasArchiveBook {
    title: string,
    author: string,
    imgUrl: string,
    md5: string,
    size: string,
    genre: string,
    format: string,
    year: string
}

export interface BestBook {
    id: string,
    title: string,
    description: string,
    publicationDate: string,
    language: string,
    rating: number,
    imageUrl: number,
    genres: string[],
    amazonLink: string,
    author: string
}

export interface OpenLibraryBook {
    isbn: string,
    title: string,
    coverId: string,
    idGutenberg: string[],
    idGoodreads: string[],
    idAmazon: string[],
    language: string[],
    publishYear: string,
    subject: string[],
    ratingAverage: number,
    ratingSortable: number,
    author: string[],
    ebookAcess: boolean,
}

export interface ProjectGutenbergBook {
    id: number,
    title: string,
    description: string,
    bookShelves: string[],
    languages: string[],
    resources: [{
        id: number,
        uri: string,
        type: string
    }],
}

export interface DownloadInfo {
    urls: string[],
    format: string,
    size: {
        value: number,
        metric: FileSizeMetric
    }
}

export interface BookLink {
    readUrl: string,
    downloadUrl: string,
    format: string,
    size: {
        value: number,
        metric: FileSizeMetric
    }
    buyUrl: string,
}

export interface ClientBook {
    id: string,
    title: string,
    coverUrl: string,
    author: string[],
    subject: string[],
    rating: number,
    publishedYear: number,
    language: string[],
    ebookAccess: boolean,
    link: BookLink
}

export interface StorageBook {
    id: string,
    meta: {
        isbn: string,
        idGutenberg: string[],
        idGoodreads: string[],
        idAnnasArchive: string[],
        idAmazon: string[]
    },
    coverUrl: string,
    title: string,
    author: string[],
    subject: string[],
    rating: number,
    publishedYear: number,
    language: string[],
    ebookAccess: boolean,
    complete: boolean,
    link?: BookLink
}

export enum BookSources {
    Native = "Book Shelf",
    AnnasArchive = "Anna's Archive",
    Goodreads = "Goodreads",
    GoodreadsBooks = "Goodreads Books",
    OpenLibrary = "Open Library",
    ProjectGutenberg = "Project Gutenberg"
}

export interface BooksData {
    src: string,
    books: AnnasArchiveBook[] | GoodreadsBook[] | BestBook[] | OpenLibraryBook[],
    totalResults: number,
    currentPage: number,
}

export interface SearchParams {
    query: string,
    page: number,
    pageSize: number
}

export interface PublicationFrequency {
    year: number,
    books: number
}

export interface GenreDistribution {
    genre: string,
    count: number,
    percentage: number
}