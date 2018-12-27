import { Action } from "@ngrx/store";
import { IAuthor } from "../../../shared/models/author.model";
import { IAuthorSearchFilter } from "../../authors/models/authors-search-filter.model";
import { AuthorSortColumns } from "../../authors/models/author-sort-columns";
import { ISortCriteria } from "src/app/shared/models/sort-criteria.model";

export enum ActionTypes {
    FilterAuthors = '[Author] Filter Authors',
    SortAuthors = '[Author] Sort Authors',
    SortAuthorsSuccess = '[Author] Sort Authors Success',
    DeleteAuthor = '[Author] Delete Author',
    DeleteAuthorSuccessShowInfo = '[Author] Delete Author Success Show Info',
    SaveAuthor = '[Author] Save Author',
    SetAuthorsEditMode = '[Author] Set Authors Edit Mode'
}

export class FilterAuthorsAction implements Action {
  public readonly type = ActionTypes.FilterAuthors;

  constructor(public payload: IAuthorSearchFilter) { }
}

export class SortAuthorsAction implements Action {
  public readonly type = ActionTypes.SortAuthors;

  constructor(public payload: AuthorSortColumns) { }
}

export class SortAuthorsSuccessAction implements Action {
  public readonly type = ActionTypes.SortAuthorsSuccess;

  constructor(public payload: ISortCriteria<AuthorSortColumns>) { }
}

export class DeleteAuthorAction implements Action {
  public readonly type = ActionTypes.DeleteAuthor;

  constructor(public payload: number) { }
}

export class DeleteAuthorSuccessShowInfoAction implements Action {
  public readonly type = ActionTypes.DeleteAuthorSuccessShowInfo;

  constructor(public payload: boolean) { }
}

export class SaveAuthorAction implements Action {
  public readonly type = ActionTypes.SaveAuthor;

  constructor(public payload: IAuthor) { }
}

export class SetAuthorsEditModeAction implements Action {
  public readonly type = ActionTypes.SetAuthorsEditMode;

  constructor(public payload: boolean) { }
}

export type Actions =
  | FilterAuthorsAction
  | SortAuthorsAction
  | SortAuthorsSuccessAction
  | DeleteAuthorAction
  | DeleteAuthorSuccessShowInfoAction
  | SaveAuthorAction
  | SetAuthorsEditModeAction;
