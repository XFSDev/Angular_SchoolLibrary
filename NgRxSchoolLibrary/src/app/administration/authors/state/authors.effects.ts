import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as authorsActions from './authors.actions';
import { AuthorsService } from '../authors.service';
import { mergeMap, map, withLatestFrom, switchMap, tap, catchError } from 'rxjs/operators';
import { pipe, of, Observable, empty } from 'rxjs';
import { Store, select, Action } from '@ngrx/store';
import { getAuthorsSortCriteria } from './authors.reducer';
import { getRouterParams } from 'src/app/state/app.reducer';
import { IAuthor } from 'src/app/shared/models/author.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthorsEffects {
  constructor(private _actions$: Actions,
    private _authorsService: AuthorsService,
    private _router: Router,
    private _store: Store<any>) { }

    @Effect()
    sortAuthors$ = this._actions$.pipe(
        ofType(authorsActions.ActionTypes.SortAuthors),
        pipe(
            map((action: authorsActions.SortAuthorsAction) => action.payload),
            withLatestFrom(this._store.pipe(select(getAuthorsSortCriteria))),
            switchMap(([column, oldCriteria]) => {
                return of(new authorsActions.SortAuthorsSuccessAction({
                    sortColumn: column,
                    sortOrderDesc: oldCriteria && column === oldCriteria.sortColumn ? !oldCriteria.sortOrderDesc : false
                  }));
            })
        )
    );

    @Effect()
    public loadAuthor$: Observable<Action> = this._actions$.pipe(
      ofType(authorsActions.ActionTypes.LoadAuthor),
      pipe(
        withLatestFrom(this._store.pipe(select(getRouterParams))),
        switchMap(([, params]) => {
          let id = 0;

          if (params && params['id']) {
            id = +params['id'];
          }

          return id > 0
            ? this._authorsService
                .getAuthor(id)
                .pipe(
                  map(
                    (author: IAuthor) => new authorsActions.LoadAuthorSuccessAction(author)
                  ),
                  catchError((err, caught) => {
                    // error handled by http interceptor
                    return empty();
                  })
                )
            : of(
                new authorsActions.LoadAuthorSuccessAction({
                  additionalInformation: '',
                  authorID: 0,
                  firstName: '',
                  fullName: '',
                  isDeleted: false,
                  lastName: ''
                })
              );
        })
      )
    );

  @Effect()
  deleteAuthor$ = this._actions$.pipe(
    ofType(authorsActions.ActionTypes.DeleteAuthor),
    mergeMap((action: authorsActions.DeleteAuthorAction) =>
      this._authorsService
        .deleteAuthor(action.payload)
        .pipe(
          map(() => new authorsActions.DeleteAuthorSuccessShowInfoAction(true)),
          catchError((err, caught) => {
            // error handled by http interceptor
            return empty();
          })
        )
    )
  );

  @Effect({ dispatch: false })
  saveAuthor$ = this._actions$.pipe(
    ofType(authorsActions.ActionTypes.SaveAuthor),
    mergeMap((action: authorsActions.SaveAuthorAction) =>
      this._authorsService
        .updateAuthor(action.payload)
        .pipe(tap(() => this._router.navigate(['/administration/authors'])),
        catchError((err, caught) => {
          // error handled by http interceptor
          return empty();
        })
        )
    )
  );
}
