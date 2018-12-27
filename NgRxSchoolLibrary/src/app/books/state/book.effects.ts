import { Injectable } from '@angular/core';
import { BooksService } from '../books.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import * as bookActions from './book.actions';
import { IBook } from '../models/book.model';
import { LoansService } from '../../loans/loans.service';
import { Router } from '@angular/router';
import { of, Observable, pipe } from 'rxjs';
import { getRouterParams } from 'src/app/state/app.reducer';
import { Action, Store, select } from '@ngrx/store';
import { getBooksSortCriteria } from './book.reducer';

@Injectable()
export class BookEffects {
  constructor(
    private _actions$: Actions,
    private _bookService: BooksService,
    private _loanService: LoansService,
    private _router: Router,
    private _store: Store<any>
  ) {}

  @Effect()
  loadBooks$ = this._actions$.pipe(
    ofType(bookActions.ActionTypes.LoadBooks),
    mergeMap(() => this._bookService
        .getBooks()
        .pipe(map((books: IBook[]) => new bookActions.LoadBooksSuccessAction(books)))
    )
  );

  @Effect()
  sortBooks$ = this._actions$.pipe(
      ofType(bookActions.ActionTypes.SortBooks),
      pipe(
          map((action: bookActions.SortBooksAction) => action.payload),
          withLatestFrom(this._store.pipe(select(getBooksSortCriteria))),
          switchMap(([column, oldCriteria]) => {
              return of(new bookActions.SortBooksSuccessAction({
                  sortColumn: column,
                  sortOrderDesc: oldCriteria && column === oldCriteria.sortColumn ? !oldCriteria.sortOrderDesc : false
                }));
          })
      )
  );

  @Effect()
  public loadBook$: Observable<Action> = this._actions$.pipe(
    ofType(bookActions.ActionTypes.LoadBook),
    pipe(
      withLatestFrom(this._store.pipe(select(getRouterParams))),
      switchMap(([, params]) => {
        let id = 0;

        if (params && params['id']) {
          id = +params['id'];
        }

        return id > 0
          ? this._bookService
              .getBook(id)
              .pipe(
                map(
                  (book: IBook) => new bookActions.LoadBookSuccessAction(book)
                )
              )
          : of(
              new bookActions.LoadBookSuccessAction({
                additionalInformation: '',
                authorIds: [],
                authorsList: '',
                bookID: 0,
                isDeleted: false,
                publisherID: 0,
                publisherName: '',
                releaseDate: null,
                status: 0,
                statusName: '',
                title: ''
              })
            );
      })
    )
  );

  @Effect()
  requestBook$ = this._actions$.pipe(
    ofType(bookActions.ActionTypes.RequestBook),
    mergeMap((action: bookActions.RequestBookAction) =>
      this._loanService
        .requestBook(action.payload)
        .pipe(map(() => new bookActions.RequestBookSuccessShowInfoAction(true)))
    )
  );

  @Effect()
  deleteBook$ = this._actions$.pipe(
    ofType(bookActions.ActionTypes.DeleteBook),
    mergeMap((action: bookActions.DeleteBookAction) =>
      this._bookService
        .deleteBook(action.payload)
        .pipe(map(() => new bookActions.DeleteBookSuccessShowInfoAction(true)))
    )
  );

  @Effect({ dispatch: false })
  saveBook$ = this._actions$.pipe(
    ofType(bookActions.ActionTypes.SaveBook),
    mergeMap((action: bookActions.SaveBookAction) =>
      this._bookService
        .updateBook(action.payload)
        .pipe(tap(() => this._router.navigate(['/books'])))
    )
  );
}
