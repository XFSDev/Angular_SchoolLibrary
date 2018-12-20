import { IPublisher } from "../publishers/publisher.model";
import { IAuthor } from "../authors/author.model";
import { IUser } from "../users/user.model";
import { Actions, ActionTypes } from './administration.actions';

export interface IAdministrationState {
    publishers: IPublisher[];
    authors: IAuthor[];
    users: IUser[];
}

const initialState: IAdministrationState = {
    publishers: [],
    authors: [],
    users: []
};

export function reducer(state: IAdministrationState = initialState, action: Actions): IAdministrationState {
    switch (action.type) {

        default:
            return state;
    }
}
