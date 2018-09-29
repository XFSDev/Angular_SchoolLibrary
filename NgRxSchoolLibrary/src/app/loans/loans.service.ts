import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILoan } from './loan.model';

import * as bookStatus from '../books/book-statuses';
import { ILoanSearchFilter } from './loans-list/loan-search-filter.model';
import { LoanSortColumns } from './loans-list/loan-sort-columns';

@Injectable()
export class LoansService {

  constructor(private _http: HttpClient) { }

  public filterLoans(loans: ILoan[], loansSearchFilter: ILoanSearchFilter): ILoan[] {
    return loans.filter((loan) => {
      const titleQuery = loansSearchFilter.title.length === 0 ||
        loan.book.title.toUpperCase().includes(loansSearchFilter.title.toUpperCase());
      const userQuery = loansSearchFilter.user.length === 0 ||
        loan.user.fullName.toUpperCase().includes(loansSearchFilter.user.toUpperCase());
      const statusQuery = loansSearchFilter.bookStatuses
        .filter(status => status.selected)
        .map(status => status.id)
        .includes(loan.book.status);

      return titleQuery && userQuery && statusQuery;
    });
  }

  public sortLoans(loans: ILoan[], column: string, loansSortDesc: boolean) {
    loans.sort((first, second) => {
      let firstField: any;
      let secondField: any;

      if (column === LoanSortColumns.Title) {
        firstField = first.book.title.toUpperCase();
        secondField = second.book.title.toUpperCase();
      } else if (column === LoanSortColumns.Authors) {
        firstField = first.book.authorsList.toUpperCase();
        secondField = second.book.authorsList.toUpperCase();
      } else if (column === LoanSortColumns.User) {
        firstField = first.user.fullName.toUpperCase();
        secondField = second.user.fullName.toUpperCase();
      } else if (column === LoanSortColumns.RequestDate) {
        firstField = first.requestDate;
        secondField = second.requestDate;
      } else if (column === LoanSortColumns.BorrowDate) {
        firstField = first.borrowDate;
        secondField = second.borrowDate;
      } else if (column === LoanSortColumns.Status) {
        firstField = first.book.statusName.toUpperCase();
        secondField = second.book.statusName.toUpperCase();
      } else {
        return 0;
      }

      let comparison = firstField > secondField ? 1 : (firstField < secondField ? -1 : 0);
      if (loansSortDesc) {
        comparison = -comparison;
      }

      return comparison;
    });
  }

  public getLoans(): Observable<ILoan[]> {
    return this._http.get<ILoan[]>('http://localhost:4200/api/loans');
  }

  public requestBook(bookID: number): Observable<any> {
    return this._http.post(`http://localhost:4200/api/loans/request?bookID=${bookID}`, {});
  }

  public returnBook(userID: number, bookID: number): Observable<any> {
    return this._http.post(`http://localhost:4200/api/loans/update/${userID}/${bookID}/${bookStatus.AVAILABLE}`, {});
  }

  public lendBook(userID: number, bookID: number): Observable<any> {
    return this._http.post(`http://localhost:4200/api/loans/update/${userID}/${bookID}/${bookStatus.BORROWED}`, {});
  }

  public setBookStatusToLost(userID: number, bookID: number): Observable<any> {
    return this._http.post(`http://localhost:4200/api/loans/update/${userID}/${bookID}/${bookStatus.LOST}`, {});
  }
}
