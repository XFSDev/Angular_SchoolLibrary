import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthors from '../authors/state/authors.reducer';
import * as fromPublishers from '../publishers/state/publishers.reducer';

export interface IAdministrationState {
  authors: fromAuthors.IAuthorsState;
  publishers: fromPublishers.IPublishersState;
}

export const reducers: ActionReducerMap<IAdministrationState> = {
  authors: fromAuthors.reducer,
  publishers: fromPublishers.reducer
};
