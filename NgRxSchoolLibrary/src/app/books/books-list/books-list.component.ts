import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { BooksService } from '../books.service';

import { IPublisher } from '../../administration/publishers/publisher.model';
import { IAuthor } from '../../administration/authors/author.model';
import { IBook } from '../../books/book.model';
import { IBookSearchFilter } from './books-search-filter.model';

import { Store, select } from '@ngrx/store';

import { getAuthors, getPublishers } from 'src/app/state/app.reducer';

import * as appActions from 'src/app/state/app.actions';
import * as bookActions from '../state/book.actions';
import { Observable, combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
// tslint:disable-next-line:max-line-length
import { getBooks, getBooksSearchFilter, getBooksSortCriteria, getBookRequestedShowInfo, getBookDeletedShowInfo, IBookState } from '../state/book.reducer';
import { BookSortColumns } from '../books-list/book-sort-columns';
import { ISortCriteria } from '../../sort-criteria.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit, OnDestroy {
  private _componentActive: boolean;

  public publishers$: Observable<IPublisher[]>;
  public authors$: Observable<IAuthor[]>;
  public booksSearchFilter: IBookSearchFilter;
  public filteredBooks: IBook[];

  public sortCriteria: ISortCriteria<BookSortColumns>;

  public showRequestBook: boolean;
  public showDeleteButton: boolean;
  public showAddButton: boolean;

  constructor(
    private _store: Store<IBookState>,
    private _authService: AuthenticationService,
    private _booksService: BooksService) {
    this.showRequestBook = this._authService.canRequestBook();
    this.showDeleteButton = this._authService.canDeleteBook();
    this.showAddButton = this._authService.canAddBook();
  }

  ngOnInit() {
    this._componentActive = true;

    this._store.dispatch(new appActions.LoadPublishersAction());
    this._store.dispatch(new appActions.LoadAuthorsAction());
    this._store.dispatch(new bookActions.LoadBooksAction());

    this.publishers$ = this._store.pipe(select(getPublishers));
    this.authors$ = this._store.pipe(select(getAuthors));

    this._store.pipe(select(getBooksSortCriteria),
      takeWhile(() => this._componentActive)
    ).subscribe((criteria) => {
      this.sortCriteria = criteria;
      this.sortBooksList();
    });

    combineLatest(
      this._store.pipe(select(getBooks), takeWhile(() => this._componentActive)),
      this._store.pipe(select(getBooksSearchFilter), takeWhile(() => this._componentActive))
    ).subscribe((result) => {
      if (result) {
        if (result[1]) {
          this.booksSearchFilter = result[1];
        }

        this.filteredBooks = this._booksService.filterBooks(result[0], this.booksSearchFilter);
        this.sortBooksList();
      }
    });

    this._store.pipe(select(getBookRequestedShowInfo),
      takeWhile(() => this._componentActive)
    ).subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('Book request has been sent successfully');
        this._store.dispatch(new bookActions.RequestBookSuccessShowInfoAction(false));
        this._store.dispatch(new bookActions.LoadBooksAction());
      }
    });

    this._store.pipe(select(getBookDeletedShowInfo),
      takeWhile(() => this._componentActive)
    ).subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('Book has been deleted successfully');
        this._store.dispatch(new bookActions.DeleteBookSuccessShowInfoAction(false));
        this._store.dispatch(new bookActions.LoadBooksAction());
      }
    });
  }

  ngOnDestroy() {
    this._componentActive = false;
  }

  public filterBooks(booksSearchFilter: IBookSearchFilter) {
    this._store.dispatch(new bookActions.FilterBooksAction(booksSearchFilter));
  }

  sortBooks(column: BookSortColumns) {
    this._store.dispatch(new bookActions.SortBooksAction({
      sortColumn: column,
      sortOrderDesc: this.sortCriteria.sortColumn === column ? !this.sortCriteria.sortOrderDesc : false
    }));
  }

  requestBook(bookID: number): void {
    if (window.confirm('Are you sure you want to borrow this book?')) {
      this._store.dispatch(new bookActions.RequestBookAction(bookID));
    }
  }

  deleteBook(bookID: number): void {
    if (window.confirm('Are you sure you want to delete this book?')) {
      this._store.dispatch(new bookActions.DeleteBookAction(bookID));
    }
  }

  private sortBooksList() {
    if (this.filteredBooks && this.sortCriteria) {
      this._booksService.sortBooks(this.filteredBooks, this.sortCriteria.sortColumn, this.sortCriteria.sortOrderDesc);
    }
  }
}
