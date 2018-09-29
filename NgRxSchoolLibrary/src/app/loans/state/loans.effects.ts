import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as loansActions from './loans.actions';
import { mergeMap, map } from 'rxjs/operators';
import { ILoan } from '../loan.model';
import { LoansService } from '../loans.service';

@Injectable()
export class LoansEffects {
    constructor(private _actions$: Actions, private _loanService: LoansService) { }

    @Effect()
    loadLoans$ = this._actions$.pipe(
        ofType(loansActions.ActionTypes.LoadLoans),
        mergeMap((action: loansActions.LoadLoansAction) => this._loanService.getLoans().pipe(
            map((loans: ILoan[]) => new loansActions.LoadLoansSuccessAction(loans))
        ))
    );
}
