import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAuthor } from '../../shared/models/author.model';

@Injectable()
export class AuthorsService {

  constructor(private _http: HttpClient) {}

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
