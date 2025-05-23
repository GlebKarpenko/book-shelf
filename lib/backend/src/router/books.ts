import { Router } from 'express';

import { isAuthenticated } from '@app/middlewares';
import { 
    getFiltered, 
    getFilterOptions, 
    getGeneralPopular, 
    getRecommendations, 
    lookupBookDetails, 
    searchBook,
    searchDownloadableBook, 
} from '@app/controllers/books/books';

export default (router: Router): void => {
    router.get('/books/popular/:page/:limit?', getGeneralPopular);
    router.get('/books/detailed/:id', lookupBookDetails);
    router.get('/books/search/:query/:page', searchBook);
    router.get('/books/search/downloadable/:query/:page', searchDownloadableBook);
    router.get('/books/filter/options', getFilterOptions);
    router.post('/books/filter/', getFiltered);
    router.get('/books/user/recommended/:page', isAuthenticated, getRecommendations);
}
