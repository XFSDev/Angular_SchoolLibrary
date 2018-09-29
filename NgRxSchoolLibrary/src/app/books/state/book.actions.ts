import { Action } from '@ngrx/store';
import { IBook } from '../book.model';
import { IBookSearchFilter } from '../books-list/books-search-filter.model';
import { ISortCriteria } from '../../sort-criteria.model';
import { BookSortColumns } from '../books-list/book-sort-columns';

export enum ActionTypes {
    LoadBooks = '[Book] Load Books',
    LoadBooksSuccess = '[Book] Load Books Success',
    FilterBooks = '[Book] Filter Books',
    SortBooks = '[Book] Sort Books',
    RequestBook = '[Book] Request Book',
    RequestBookSuccessShowInfo = '[Book] Request Book Success Show Info',
    DeleteBook = '[Book] Delete Book',
    DeleteBookSuccessShowInfo = '[Book] Delete Book Success Show Info'
}

export class LoadBooksAction implements Action {
    public readonly type = ActionTypes.LoadBooks;

    constructor() { }
}

export class LoadBooksSuccessAction implements Action {
    public readonly type = ActionTypes.LoadBooksSuccess;

    constructor(public payload: IBook[]) { }
}

export class FilterBooksAction implements Action {
    public readonly type = ActionTypes.FilterBooks;

    constructor(public payload: IBookSearchFilter) { }
}

export class SortBooksAction implements Action {
    public readonly type = ActionTypes.SortBooks;

    constructor(public payload: ISortCriteria<BookSortColumns>) { }
}

export class RequestBookAction implements Action {
    public readonly type = ActionTypes.RequestBook;

    constructor(public payload: number) { }
}

export class RequestBookSuccessShowInfoAction implements Action {
    public readonly type = ActionTypes.RequestBookSuccessShowInfo;

    constructor(public payload: boolean) { }
}

export class DeleteBookAction implements Action {
    public readonly type = ActionTypes.DeleteBook;

    constructor(public payload: number) { }
}

export class DeleteBookSuccessShowInfoAction implements Action {
    public readonly type = ActionTypes.DeleteBookSuccessShowInfo;

    constructor(public payload: boolean) { }
}

export type Actions = LoadBooksAction | LoadBooksSuccessAction | FilterBooksAction | SortBooksAction |
    RequestBookAction | RequestBookSuccessShowInfoAction | DeleteBookAction | DeleteBookSuccessShowInfoAction;
