import { Injectable } from '@angular/core';
import { BooksService } from '../books.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, tap } from 'rxjs/operators';
import * as bookActions from './book.actions';
import { IBook } from '../book.model';
import { LoansService } from '../../loans/loans.service';

@Injectable()
export class BookEffects {
    constructor(private _actions$: Actions,
        private _bookService: BooksService,
        private _loanService: LoansService) { }

    @Effect()
    loadBooks$ = this._actions$.pipe(
        ofType(bookActions.ActionTypes.LoadBooks),
        mergeMap((action: bookActions.LoadBooksAction) => this._bookService.getBooks().pipe(
            map((books: IBook[]) => new bookActions.LoadBooksSuccessAction(books))
        ))
    );

    @Effect()
    requestBook$ = this._actions$.pipe(
        ofType(bookActions.ActionTypes.RequestBook),
        mergeMap((action: bookActions.RequestBookAction) => this._loanService.requestBook(action.payload).pipe(
            map(() => new bookActions.RequestBookSuccessShowInfoAction(true))
        ))
    );

    @Effect()
    deleteBook$ = this._actions$.pipe(
        ofType(bookActions.ActionTypes.DeleteBook),
        mergeMap((action: bookActions.DeleteBookAction) => this._bookService.deleteBook(action.payload).pipe(
            map(() => new bookActions.DeleteBookSuccessShowInfoAction(true))
        ))
    );
}
