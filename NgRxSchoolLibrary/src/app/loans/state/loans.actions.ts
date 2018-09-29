import { Action } from '@ngrx/store';
import { ILoan } from '../loan.model';
import { ILoanSearchFilter } from '../loans-list/loan-search-filter.model';
import { ISortCriteria } from '../../sort-criteria.model';
import { LoanSortColumns } from '../loans-list/loan-sort-columns';

export enum ActionTypes {
    LoadLoans = '[Loan] Load Loans',
    LoadLoansSuccess = '[Loan] Load Loans Success',
    FilterLoans = '[Loan] Filter Loans',
    SortLoans = '[Loan] Sort Loans',
    LendBook = '[Loan] Lend Book',
    ReturnBook = '[Loan] Return Book',
    SetBookStatusToLost = '[Loan] Set Book Status To Lost'
}

export class LoadLoansAction implements Action {
    public readonly type = ActionTypes.LoadLoans;

    constructor() { }
}

export class LoadLoansSuccessAction implements Action {
    public readonly type = ActionTypes.LoadLoansSuccess;

    constructor(public payload: ILoan[]) { }
}

export class FilterLoansAction implements Action {
    public readonly type = ActionTypes.FilterLoans;

    constructor(public payload: ILoanSearchFilter) { }
}

export class SortLoansAction implements Action {
    public readonly type = ActionTypes.SortLoans;

    constructor(public payload: ISortCriteria<LoanSortColumns>) { }
}

export class LendBookAction implements Action {
    public readonly type = ActionTypes.LendBook;

    constructor(public payload: number) { }
}

export class ReturnBookAction implements Action {
    public readonly type = ActionTypes.ReturnBook;

    constructor(public payload: number) { }
}

export class SetBookStatusToLostAction implements Action {
    public readonly type = ActionTypes.SetBookStatusToLost;

    constructor(public payload: number) { }
}

export type Actions = LoadLoansAction | LoadLoansSuccessAction | FilterLoansAction | SortLoansAction | LendBookAction |
    ReturnBookAction | SetBookStatusToLostAction;
