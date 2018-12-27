import { IPublisher } from "../../../shared/models/publisher.model";
import { IAuthor } from "../../../shared/models/author.model";
import { IUser } from "../../users/models/user.model";
import { Actions, ActionTypes } from './authors.actions';
import { IAuthorSearchFilter } from "../../authors/models/authors-search-filter.model";
import { AuthorSortColumns } from "../../authors/models/author-sort-columns";
import { ISortCriteria } from "src/app/shared/models/sort-criteria.model";

export interface IAuthorsState {
  authorsSearchFilter: IAuthorSearchFilter;
  sortCriteria: ISortCriteria<AuthorSortColumns>;
  author: IAuthor;
  isEditMode: boolean;
}

const initialState: IAuthorsState = {
    authorsSearchFilter: {
      additionalInformation: '',
      fullName: ''
    },
    sortCriteria: {
      sortColumn: AuthorSortColumns.FullName,
      sortOrderDesc: false
    },
    author: null,
    isEditMode: false
};

export function reducer(state: IAuthorsState = initialState, action: Actions): IAuthorsState {
    switch (action.type) {

        default:
            return state;
    }
}
