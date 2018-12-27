import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBook } from './models/book.model';
import { IBookStatus } from '../loans/models/book-status.model';

@Injectable()
export class BooksService {

  constructor(private _http: HttpClient) {}

  public getBookStatuses(): Observable<IBookStatus[]> {
    return this._http.get<IBookStatus[]>('http://localhost:4200/api/books/statuses');
  }

  public getBooks(): Observable<IBook[]> {
    return this._http.get<IBook[]>('http://localhost:4200/api/books');
  }

  public getBook(bookID): Observable<IBook> {
    return this._http.get<IBook>(`http://localhost:4200/api/books/${bookID}`);
  }

  public deleteBook(bookID: number): Observable<any> {
    return this._http.delete(`http://localhost:4200/api/books/${bookID}`);
  }

  public updateBook(book: IBook): Observable<any> {
    return this._http.post('http://localhost:4200/api/books', book);
  }
}
