import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoansService } from '../loans.service';
import { BooksService } from '../../books/books.service';
import { IBookStatus } from '../book-status.model';
import * as bookStatuses from '../../books/book-statuses';
import { ILoanSearchFilter, IBookStatusSearch } from './loan-search-filter.model';
import { ILoan } from '../loan.model';
import { ILoanEvent } from './loan-event.model';

import { LoanSortColumns } from './loan-sort-columns';
import { ILoansState, getLoans, getLoansSortCriteria, getLoansSearchFilter } from '../state/loans.reducer';
import { Store, select } from '@ngrx/store';

import * as loansActions from '../state/loans.actions';
import { takeWhile } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ISortCriteria } from '../../sort-criteria.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'loans-list',
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.css']
})
export class LoansListComponent implements OnInit, OnDestroy {
  private _componentActive: boolean;

  public loansSearchFilter: ILoanSearchFilter;
  public filteredLoans: ILoan[];
  public sortCriteria: ISortCriteria<LoanSortColumns>;

  constructor(
    private _store: Store<ILoansState>,
    private _booksService: BooksService,
    private _loansService: LoansService) {
  }

  ngOnInit() {
    this._componentActive = true;

    this._booksService.getBookStatuses()
      .subscribe((statuses: IBookStatus[]) => {
        const loanBookStatuses = statuses.filter(status => status.id !== bookStatuses.AVAILABLE);

        const bookStatusSearchFilter = loanBookStatuses.map(status => <IBookStatusSearch>{
          id: status.id,
          name: status.name,
          selected: true
        });

        const defaultFilter = <ILoanSearchFilter>{
          title: '',
          user: '',
          bookStatuses: bookStatusSearchFilter
        };

        this._store.dispatch(new loansActions.FilterLoansAction(defaultFilter));
        this._store.dispatch(new loansActions.LoadLoansAction());
      });

    this._store.pipe(select(getLoansSortCriteria),
      takeWhile(() => this._componentActive)
    ).subscribe((criteria) => {
      this.sortCriteria = criteria;
      this.sortLoansList();
    });

    combineLatest(
      this._store.pipe(select(getLoans), takeWhile(() => this._componentActive)),
      this._store.pipe(select(getLoansSearchFilter), takeWhile(() => this._componentActive))
    ).subscribe((result) => {
      if (result) {
        if (result[1]) {
          this.loansSearchFilter = result[1];
        }

        this.filteredLoans = this._loansService.filterLoans(result[0], this.loansSearchFilter);
        this.sortLoansList();
      }
    });

  }

  ngOnDestroy() {
    this._componentActive = false;
  }

  public filterLoansList(loansSearchFilter: ILoanSearchFilter) {
    this._store.dispatch(new loansActions.FilterLoansAction(loansSearchFilter));
  }

  public sortLoans(column: LoanSortColumns) {
    this._store.dispatch(new loansActions.SortLoansAction({
      sortColumn: column,
      sortOrderDesc: this.sortCriteria.sortColumn === column ? !this.sortCriteria.sortOrderDesc : false
    }));
  }

  public lendBook(loanEvent: ILoanEvent) {
    if (window.confirm('Are you sure you want to change the status to \'Borrowed\'?')) {
      this._loansService.lendBook(loanEvent.userID, loanEvent.bookID).subscribe(() => {
        window.alert('The status has been changed successfully');
        this._store.dispatch(new loansActions.LoadLoansAction());
      });
    }
  }

  public returnBook(loanEvent: ILoanEvent) {
    if (window.confirm('Are you sure you want to change the status to \'Available\'?')) {
      this._loansService.returnBook(loanEvent.userID, loanEvent.bookID).subscribe(() => {
        window.alert('The status has been changed successfully');
        this._store.dispatch(new loansActions.LoadLoansAction());
      });
    }
  }

  public setBookStatusToLost(loanEvent: ILoanEvent) {
    if (window.confirm('Are you sure you want to change the status to \'Lost\'?')) {
      this._loansService.setBookStatusToLost(loanEvent.userID, loanEvent.bookID).subscribe(() => {
        window.alert('The status has been changed successfully');
        this._store.dispatch(new loansActions.LoadLoansAction());
      });
    }
  }

  private sortLoansList() {
    if (this.filteredLoans && this.sortCriteria) {
      this._loansService.sortLoans(this.filteredLoans, this.sortCriteria.sortColumn, this.sortCriteria.sortOrderDesc);
    }
  }
}
