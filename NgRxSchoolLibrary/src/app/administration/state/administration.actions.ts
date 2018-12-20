import { Action } from "@ngrx/store";
import { IAuthor } from "../authors/author.model";

export enum ActionTypes {
    LoadAuthors = '[Administration] Load Authors',
    LoadAuthorsSuccess = '[Administration] Load Authors Success',
}

export class LoadAuthorsAction implements Action {
    public readonly type = ActionTypes.LoadAuthors;

    constructor() { }
}

export class LoadAuthorsSuccessAction implements Action {
    public readonly type = ActionTypes.LoadAuthorsSuccess;

    constructor(public payload: IAuthor[]) { }
}

export type Actions = LoadAuthorsAction | LoadAuthorsSuccessAction;
