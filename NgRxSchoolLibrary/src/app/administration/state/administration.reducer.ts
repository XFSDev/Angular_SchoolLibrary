import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthors from '../authors/state/authors.reducer';

export interface IAdministrationState {
  authors: fromAuthors.IAuthorsState;
}

export const reducers: ActionReducerMap<IAdministrationState> = {
  authors: fromAuthors.reducer
};
