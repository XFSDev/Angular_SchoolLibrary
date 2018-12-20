import { Action } from '@ngrx/store';
import { IBook } from '../book.model';
import { IBookSearchFilter } from '../books-list/books-search-filter.model';
import { ISortCriteria } from '../../sort-criteria.model';
import { BookSortColumns } from '../books-list/book-sort-columns';

export enum ActionTypes {
    LoadBooks = '[Book] Load Books',
    LoadBooksSuccess = '[Book] Load Books Success',
    LoadBook = '[Book] Load Book',
    LoadBookSuccess = '[Book] Load Book Success',
    FilterBooks = '[Book] Filter Books',
    SortBooks = '[Book] Sort Books',
    RequestBook = '[Book] Request Book',
    RequestBookSuccessShowInfo = '[Book] Request Book Success Show Info',
    DeleteBook = '[Book] Delete Book',
    DeleteBookSuccessShowInfo = '[Book] Delete Book Success Show Info',
    SaveBook = '[Book] Save Book',
    SetEditMode = '[Book] Set Edit Mode'
}

export class LoadBooksAction implements Action {
    public readonly type = ActionTypes.LoadBooks;

    constructor() { }
}

export class LoadBooksSuccessAction implements Action {
    public readonly type = ActionTypes.LoadBooksSuccess;

    constructor(public payload: IBook[]) { }
}

export class LoadBookAction implements Action {
    public readonly type = ActionTypes.LoadBook;

    constructor() { }
}

export class LoadBookSuccessAction implements Action {
    public readonly type = ActionTypes.LoadBookSuccess;

    constructor(public payload: IBook) { }
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

export class SaveBookAction implements Action {
    public readonly type = ActionTypes.SaveBook;

    constructor(public payload: IBook) { }
}

export class SetEditModeAction implements Action {
    public readonly type = ActionTypes.SetEditMode;

    constructor(public payload: boolean) { }
}

export type Actions = LoadBooksAction | LoadBooksSuccessAction | LoadBookAction | LoadBookSuccessAction
                    | FilterBooksAction | SortBooksAction | RequestBookAction | RequestBookSuccessShowInfoAction
                    | DeleteBookAction | DeleteBookSuccessShowInfoAction | SaveBookAction | SetEditModeAction;
