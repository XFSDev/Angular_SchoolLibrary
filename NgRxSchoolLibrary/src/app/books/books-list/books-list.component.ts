import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';

import { IPublisher } from '../../administration/publishers/publisher.model';
import { IAuthor } from '../../administration/authors/author.model';
import { IBook } from '../../books/book.model';
import { IBookSearchFilter } from './books-search-filter.model';

import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { BookSortColumns } from '../books-list/book-sort-columns';
import { ISortCriteria } from '../../sort-criteria.model';
import { BookFacade } from '../state/book.facade';
import { AppFacade } from 'src/app/state/app.facade';

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
  public filteredBooks$: Observable<IBook[]>;

  public sortCriteria: ISortCriteria<BookSortColumns>;

  public showRequestBook: boolean;
  public showDeleteButton: boolean;
  public showAddButton: boolean;

  constructor(
    private _appFacade: AppFacade,
    private _bookFacade: BookFacade,
    private _authService: AuthenticationService,
    ) {
    this.showRequestBook = this._authService.canRequestBook();
    this.showDeleteButton = this._authService.canDeleteBook();
    this.showAddButton = this._authService.canAddBook();
  }

  ngOnInit() {
    this._componentActive = true;

    this._appFacade.loadPublishers();
    this._appFacade.loadAuthors();

    this._bookFacade.loadBooks();

    this.filteredBooks$ = this._bookFacade.getBooks();

    this.publishers$ = this._appFacade.getPublishers();
    this.authors$ = this._appFacade.getAuthors();

    this._bookFacade.getSortCriteria().pipe(takeWhile(() => this._componentActive))
    .subscribe((criteria) => {
      this.sortCriteria = criteria;
    });

    this._bookFacade.getBookRequestedShowInfo().pipe(
      takeWhile(() => this._componentActive)
    )
    .subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('Book request has been sent successfully');
        this._bookFacade.requestBookSuccessShowInfo(false);
        this._bookFacade.loadBooks();
      }
    });

    this._bookFacade.getBookDeletedShowInfo().pipe(takeWhile(() => this._componentActive))
    .subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('Book has been deleted successfully');
        this._bookFacade.deleteBookSuccessShowInfo(false);
        this._bookFacade.loadBooks();
      }
    });
  }

  ngOnDestroy() {
    this._componentActive = false;
  }

  public filterBooks(booksSearchFilter: IBookSearchFilter): void {
    this._bookFacade.filterBooks(booksSearchFilter);
  }

  public sortBooks(column: BookSortColumns): void {
    this._bookFacade.sortBooks(column, this.sortCriteria.sortColumn === column ? !this.sortCriteria.sortOrderDesc : false);
  }

  public requestBook(bookID: number): void {
    if (window.confirm('Are you sure you want to borrow this book?')) {
      this._bookFacade.requestBook(bookID);
    }
  }

  public deleteBook(bookID: number): void {
    if (window.confirm('Are you sure you want to delete this book?')) {
      this._bookFacade.deleteBook(bookID);
    }
  }
}
