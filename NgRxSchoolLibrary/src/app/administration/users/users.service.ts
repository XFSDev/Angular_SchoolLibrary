import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from './models/user.model';
import { IUserSearchFilter } from './models/users-search-filter.model';

import { UserSortColumns } from './models/user-sort-columns';
import { IUserRole } from './models/user-role.model';
import { IUserUpdateResult } from './models/user-update-result.model';

@Injectable()
export class UsersService {

  constructor(private _http: HttpClient) { }

  public filterUsers(users: IUser[], usersSearchFilter: IUserSearchFilter): IUser[] {
    if (!users || !usersSearchFilter) {
      return users;
    }

    return users.filter(user => {
      const fullNameQuery = !usersSearchFilter.fullName || usersSearchFilter.fullName.length === 0 ||
            user.fullName.toUpperCase().includes(usersSearchFilter.fullName.toUpperCase());

      const emailQuery = !usersSearchFilter.email || usersSearchFilter.email.length === 0 ||
            user.email.toUpperCase().includes(usersSearchFilter.email.toUpperCase());

      const addressQuery = !usersSearchFilter.address || usersSearchFilter.address.length === 0 ||
            user.address.toUpperCase().includes(usersSearchFilter.address.toUpperCase());

      const roleQuery = !usersSearchFilter.userRoles ||
        usersSearchFilter.userRoles.filter(role => role.selected).map(role => role.id).includes(+user.role);

      return fullNameQuery && emailQuery && addressQuery && roleQuery;
    });
  }

  public sortUsers(users: IUser[], column: string, usersSortDesc: boolean) {
    users.sort((first, second) => {
      let firstField: any;
      let secondField: any;

      if (column === UserSortColumns.FullName) {
        firstField = first.fullName.toUpperCase();
        secondField = second.fullName.toUpperCase();
      } else if (column === UserSortColumns.Email) {
        firstField = first.email.toUpperCase();
        secondField = second.email.toUpperCase();
      } else if (column === UserSortColumns.Address) {
        firstField = first.address.toUpperCase();
        secondField = second.address.toUpperCase();
      } else if (column === UserSortColumns.RoleName) {
        firstField = first.roleName.toUpperCase();
        secondField = second.roleName.toUpperCase();
      } else {
        return 0;
      }

      let comparison = firstField > secondField ? 1 : (firstField < secondField ? -1 : 0);
      if (usersSortDesc) {
        comparison = -comparison;
      }

      return comparison;
    });
  }

  getRoles(): Observable<IUserRole[]> {
    return this._http.get<IUserRole[]>('http://localhost:4200/api/users/roles');
  }

  getUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>('http://localhost:4200/api/users');
  }

  public getUser(userID): Observable<IUser> {
    return this._http.get<IUser>(`http://localhost:4200/api/users/${userID}`);
  }

  public deleteUser(userID: number): Observable<any> {
    return this._http.delete(`http://localhost:4200/api/users/${userID}`);
  }

  public updateUser(user: IUser): Observable<IUserUpdateResult> {
    return this._http.post<IUserUpdateResult>('http://localhost:4200/api/users', user);
  }
}
