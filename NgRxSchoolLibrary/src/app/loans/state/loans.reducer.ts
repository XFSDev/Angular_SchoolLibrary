import { ILoan } from '../loan.model';
import { ILoanSearchFilter } from '../loans-list/loan-search-filter.model';
import { ISortCriteria } from '../../sort-criteria.model';
import { LoanSortColumns } from '../loans-list/loan-sort-columns';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Actions, ActionTypes } from './loans.actions';

export interface ILoansState {
    loans: ILoan[];
    loansSearchFilter: ILoanSearchFilter;
    sortCriteria: ISortCriteria<LoanSortColumns>;
}

const initialState: ILoansState = {
    loans: [],
    loansSearchFilter: null,
    sortCriteria: {
        sortColumn: LoanSortColumns.Title,
        sortOrderDesc: false
    }
};

const getLoansState = createFeatureSelector<ILoansState>('loans');

export const getLoansSearchFilter = createSelector(
    getLoansState,
    state => state.loansSearchFilter
);

export const getLoans = createSelector(
    getLoansState,
    state => state.loans
);

export const getLoansSortCriteria = createSelector(
    getLoansState,
    state => state.sortCriteria
);

export function reducer(state: ILoansState = initialState, action: Actions): ILoansState {
    switch (action.type) {
        case ActionTypes.FilterLoans:
            return { ...state, loansSearchFilter: action.payload };
        case ActionTypes.LoadLoansSuccess:
            return Object.assign({}, state, {
                loans: action.payload
            });
        case ActionTypes.SortLoans:
            return { ...state, sortCriteria: action.payload };
        default:
            return state;
    }
}
