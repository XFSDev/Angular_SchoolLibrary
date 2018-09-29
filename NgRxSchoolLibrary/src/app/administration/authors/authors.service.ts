import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAuthor } from '../authors/author.model';
import { IAuthorSearchFilter } from './authors-list/authors-search-filter.model';

import * as columns from '../authors/authors-list/author-sort-columns';

@Injectable()
export class AuthorsService {

  constructor(private _http: HttpClient) {}

  public filterAuthors(authors: IAuthor[], authorsSearchFilter: IAuthorSearchFilter): IAuthor[] {
    if (!authors || !authorsSearchFilter) {
      return authors;
    }

    return authors.filter(author => {
      const fullNameQuery = !authorsSearchFilter.fullName || authorsSearchFilter.fullName.length === 0 ||
            author.fullName.toUpperCase().includes(authorsSearchFilter.fullName.toUpperCase());

      const additionalInformationQuery = !authorsSearchFilter.additionalInformation ||
            authorsSearchFilter.additionalInformation.length === 0 ||
            author.additionalInformation.toUpperCase().includes(authorsSearchFilter.additionalInformation.toUpperCase());

      return fullNameQuery && additionalInformationQuery;
    });
  }

  public sortAuthors(authors: IAuthor[], column: string, authorsSortDesc: boolean) {
    authors.sort((first, second) => {
      let firstField: any;
      let secondField: any;

      if (column === columns.FULL_NAME) {
        firstField = first.fullName.toUpperCase();
        secondField = second.fullName.toUpperCase();
      } else if (column === columns.ADDITIONAL_INFORMATION) {
        firstField = first.additionalInformation.toUpperCase();
        secondField = second.additionalInformation.toUpperCase();
      } else {
        return 0;
      }

      let comparison = firstField > secondField ? 1 : (firstField < secondField ? -1 : 0);
      if (authorsSortDesc) {
        comparison = -comparison;
      }

      return comparison;
    });
  }

  public getAuthors(): Observable<IAuthor[]> {
    return this._http.get<IAuthor[]>('http://localhost:4200/api/authors');
  }

  public getAuthor(authorID): Observable<IAuthor> {
    return this._http.get<IAuthor>(`http://localhost:4200/api/authors/${authorID}`);
  }

  public deleteAuthor(authorID: number): Observable<any> {
    return this._http.delete(`http://localhost:4200/api/authors/${authorID}`);
  }

  public updateAuthor(author: IAuthor): Observable<any> {
    return this._http.post('http://localhost:4200/api/authors', author);
  }
}
