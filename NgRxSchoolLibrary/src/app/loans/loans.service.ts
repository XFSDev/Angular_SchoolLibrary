import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILoan } from './models/loan.model';

import { BookStatuses } from '../shared/models/book-statuses';

@Injectable()
export class LoansService {

  constructor(private _http: HttpClient) { }

  public getLoans(): Observable<ILoan[]> {
    return this._http.get<ILoan[]>('http://localhost:4200/api/loans');
  }

  public requestBook(bookID: number): Observable<any> {
    return this._http.post(`http://localhost:4200/api/loans/request?bookID=${bookID}`, {});
  }

  public returnBook(userID: number, bookID: number): Observable<any> {
    return this._http.post(`http://localhost:4200/api/loans/update/${userID}/${bookID}/${BookStatuses.Available}`, {});
  }

  public lendBook(userID: number, bookID: number): Observable<any> {
    return this._http.post(`http://localhost:4200/api/loans/update/${userID}/${bookID}/${BookStatuses.Borrowed}`, {});
  }

  public setBookStatusToLost(userID: number, bookID: number): Observable<any> {
    return this._http.post(`http://localhost:4200/api/loans/update/${userID}/${bookID}/${BookStatuses.Lost}`, {});
  }
}
