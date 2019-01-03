import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from './models/user.model';

import { IUserRole } from './models/user-role.model';
import { IUserUpdateResult } from './models/user-update-result.model';

@Injectable()
export class UsersService {

  constructor(private _http: HttpClient) { }

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
