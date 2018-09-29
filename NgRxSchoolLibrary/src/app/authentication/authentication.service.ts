import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ICurrentUser } from '../administration/users/current-user.model';
import { ILogin } from '../authentication/login/login.model';
import * as roles from '../authentication/roles';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const AUTHORIZATION_DATA_LOCAL_STORAGE_KEY = 'AUTHORIZATION_DATA';

@Injectable()
export class AuthenticationService {
  public currentUser: ICurrentUser;

  constructor(private _http: HttpClient) { }

  public authorizeFromLocalStorage() {
    const data = localStorage.getItem(AUTHORIZATION_DATA_LOCAL_STORAGE_KEY);
    if (!!data && data.length > 0) {
      this.currentUser = <ICurrentUser>JSON.parse(data);
    }
  }

  public login(loginData: ILogin): Observable<any> {
    return this._http.post(`http://localhost:4200/api/users/token?userName=${loginData.username}&password=${loginData.password}`, null)
      .pipe(
        tap((response: ICurrentUser) => {
          if (response) {
            this.currentUser = response;
            localStorage.setItem(AUTHORIZATION_DATA_LOCAL_STORAGE_KEY, JSON.stringify(this.currentUser));
          }
        }),
        catchError((error: Response) => Observable.throw(error.status))
      );

  }

  public logOff() {
    localStorage.removeItem(AUTHORIZATION_DATA_LOCAL_STORAGE_KEY);
    this.currentUser = null;
  }

  public canAddBook(): boolean {
    return this.currentUser && (this.currentUser.role === roles.LIBRARIAN || this.currentUser.role === roles.ADMINISTRATOR);
  }

  public canEditBook(): boolean {
    return this.currentUser && (this.currentUser.role === roles.LIBRARIAN || this.currentUser.role === roles.ADMINISTRATOR);
  }

  public canDeleteBook(): boolean {
    return this.currentUser && (this.currentUser.role === roles.LIBRARIAN || this.currentUser.role === roles.ADMINISTRATOR);
  }

  public canRequestBook(): boolean {
    return !!this.currentUser;
  }

  public canDisplayLoans(): boolean {
    return this.currentUser && (this.currentUser.role === roles.LIBRARIAN || this.currentUser.role === roles.ADMINISTRATOR);
  }

  public canEditLoans(): boolean {
    return this.currentUser && (this.currentUser.role === roles.LIBRARIAN || this.currentUser.role === roles.ADMINISTRATOR);
  }

  public displayAdministrationLink(): boolean {
    return this.canEditAuthors() || this.canEditPublishers() || this.canEditUsers();
  }

  public canDisplayAuthors(): boolean {
    return this.currentUser && (this.currentUser.role === roles.LIBRARIAN || this.currentUser.role === roles.ADMINISTRATOR);
  }

  public canEditAuthors(): boolean {
    return this.currentUser && (this.currentUser.role === roles.LIBRARIAN || this.currentUser.role === roles.ADMINISTRATOR);
  }

  public canDisplayPublishers(): boolean {
    return this.currentUser && (this.currentUser.role === roles.LIBRARIAN || this.currentUser.role === roles.ADMINISTRATOR);
  }

  public canEditPublishers(): boolean {
    return this.currentUser && (this.currentUser.role === roles.LIBRARIAN || this.currentUser.role === roles.ADMINISTRATOR);
  }

  public canDisplayUsers(): boolean {
    return this.currentUser && this.currentUser.role === roles.ADMINISTRATOR;
  }

  public canEditUsers(): boolean {
    return this.currentUser && this.currentUser.role === roles.ADMINISTRATOR;
  }
}
