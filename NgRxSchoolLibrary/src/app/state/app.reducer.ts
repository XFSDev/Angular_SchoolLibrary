import { IPublisher } from '../administration/publishers/publisher.model';

import { IAuthor } from '../administration/authors/author.model';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Actions, ActionTypes } from './app.actions';

export interface IState {
    publishers: IPublisher[];
    authors: IAuthor[];
}

const initialState: IState = {
    publishers: [],
    authors: []
};

const getMainState = createFeatureSelector<IState>('main');

export const getPublishers = createSelector(
    getMainState,
    state => state.publishers
);

export const getAuthors = createSelector(
    getMainState,
    state => state.authors
);

export function reducer(state: IState = initialState, action: Actions): IState {
    switch (action.type) {
        case ActionTypes.LoadAuthorsSuccess:
            return {...state, authors: action.payload};
        case ActionTypes.LoadPublishersSuccess:
            return {...state, publishers: action.payload};

        default:
            return state;
    }
}
