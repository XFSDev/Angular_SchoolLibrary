import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBook } from '../books/book.model';
import { IBookStatus } from '../loans/book-status.model';
import { IBookSearchFilter } from './books-list/books-search-filter.model';

import { BookSortColumns } from './books-list/book-sort-columns';

@Injectable()
export class BooksService {

  constructor(private _http: HttpClient) {}

  public filterBooks(books: IBook[], booksSearchFilter: IBookSearchFilter): IBook[] {
    if (!books || !booksSearchFilter) {
      return books;
    }

    return books.filter(book => {
      const statusQuery = !booksSearchFilter.onlyAvailable || book.status === 1;

      const titleQuery = !booksSearchFilter.title || booksSearchFilter.title.length === 0 ||
                          book.title.toUpperCase().includes(booksSearchFilter.title.toUpperCase());

      const publisherQuery = !booksSearchFilter.publisherID || +(booksSearchFilter.publisherID) === 0 ||
                              book.publisherID === +(booksSearchFilter.publisherID);

      const authorQuery = !booksSearchFilter.authorID || +(booksSearchFilter.authorID) === 0 ||
        book.authorIds.filter(author => author === +(booksSearchFilter.authorID)).length > 0;

      return statusQuery && titleQuery && publisherQuery && authorQuery;
    });
  }

  public sortBooks(books: IBook[], column: string, booksSortDesc: boolean) {
    books.sort((first, second) => {
      let firstField: any;
      let secondField: any;

      if (column === BookSortColumns.Title) {
        firstField = first.title.toUpperCase();
        secondField = second.title.toUpperCase();
      } else if (column === BookSortColumns.Authors) {
        firstField = first.authorsList.toUpperCase();
        secondField = second.authorsList.toUpperCase();
      } else if (column === BookSortColumns.Publisher) {
        firstField = first.publisherName.toUpperCase();
        secondField = second.publisherName.toUpperCase();
      } else if (column === BookSortColumns.ReleaseDate) {
        firstField = first.releaseDate;
        secondField = second.releaseDate;
      } else if (column === BookSortColumns.Status) {
        firstField = first.statusName.toUpperCase();
        secondField = second.statusName.toUpperCase();
      } else {
        return 0;
      }

      let comparison = firstField > secondField ? 1 : (firstField < secondField ? -1 : 0);
      if (booksSortDesc) {
        comparison = -comparison;
      }

      return comparison;
    });
  }

  public getBookStatuses(): Observable<IBookStatus[]> {
    return this._http.get<IBookStatus[]>('http://localhost:4200/api/books/statuses');
  }

  public getBooks(): Observable<IBook[]> {
    return this._http.get<IBook[]>('http://localhost:4200/api/books');
  }

  public getBook(bookID): Observable<IBook> {
    return this._http.get<IBook>('http://localhost:4200/api/books/' + bookID);
  }

  public deleteBook(bookID: number): Observable<any> {
    return this._http.delete(`http://localhost:4200/api/books/${bookID}`);
  }

  public updateBook(book: IBook): Observable<any> {
    return this._http.post('http://localhost:4200/api/books', book);
  }
}
