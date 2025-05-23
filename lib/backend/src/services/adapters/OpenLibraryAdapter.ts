import { AxiosInstance, AxiosResponse } from "axios";
import { openLibaryClient } from "../apiClients";
import { IBookServiceAdapter } from "./IBookServiceAdapter";
import { OpenLibraryBook, BookSources, BooksData } from "@app/interfaces/Books";
import { Languages } from "@app/interfaces/Util";

export class OpenLibraryAdapter implements IBookServiceAdapter {
    apiClient: AxiosInstance;
    /** strictMap makes adapter return any JSON it recieves without filtering */
    strictMap: boolean = true;

    constructor() {
        this.apiClient = openLibaryClient;
    }

    async fetchBooks(query: Object, page?: number): Promise<BooksData> {
        const formattedQuery: OpenLibraryQuery = this.formQuery(query);

        const response = await openLibaryClient.get('/search.json', {
            params: { ...formattedQuery }
        });

        if (!this.validFetchResponse(response))
            throw new Error ("Invalid Open Library API response");

        const books = response.data.docs;

        return {
            src: BookSources.OpenLibrary,
            books: this.strictMap ? this.mapData(books) : books,
            totalResults: response.data.numFound || response.data.docs.length,
            currentPage: 1
        }
    }

    formQuery(query: any): OpenLibraryQuery {
        const queryParams: OpenLibraryQuery = {
            q: query.q || undefined,
            author: query.author || undefined,
            subject: query.subject || undefined,
            ebook_access: query.freeEbook === true ? 'public' : undefined,
            language: query.language || undefined
        }

        return queryParams;
    }

    validFetchResponse(response: AxiosResponse): boolean {
        return response.data.docs && Array.isArray(response.data.docs);
    }

    mapData(rawData: any[]): OpenLibraryBook[] {
        const filteredBooks = rawData.filter((book) => {
            return (
                book.isbn &&
                book.title &&
                book.subject &&
                book.author_name &&
                book.ebook_access
            );
        })

        const resultBooks: OpenLibraryBook[] = [];

        for (const book of filteredBooks) {
            try {
                resultBooks.push(this.mapBook(book));
            } catch (error) {
                // skipping book
            }
        }

        return resultBooks;
    }

    mapBook(book: any): OpenLibraryBook {
        return {
            isbn: book.isbn[0],
            title: book.title,
            coverId: book.cover_i,
            idGutenberg: book.id_project_gutenberg || [],
            idGoodreads: book.id_goodreads || [],
            idAmazon: book.id_amazon || [],
            language: Object.values(book.language) || [book.language] || ['eng'],
            publishYear: book.publish_year[0] || new Date().getFullYear(), // current year
            subject: Object.values(book.subject),
            ratingAverage: book.ratings_average || 0,
            ratingSortable: book.ratings_sortable || book.ratings_average || 0,
            author: Object.values(book.author_name),
            ebookAcess: this.getEbookAcessStatus(book.ebook_access)
        }
    }

    getEbookAcessStatus(status: string): boolean {
        if (status === 'public' || 'borrowable') {
            return true;
        }
        return false;
    }
}

interface OpenLibraryQuery {
    q?: string,
    author?: string,
    subject?: string,
    ebook_access?: string,
    language?: Languages,
}
