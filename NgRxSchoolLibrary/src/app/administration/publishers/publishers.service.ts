import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPublisher } from '../../shared/models/publisher.model';

@Injectable()
export class PublishersService {

  constructor(private _http: HttpClient) {}

  getPublishers(): Observable<IPublisher[]> {
    return this._http.get<IPublisher[]>('http://localhost:4200/api/publishers');
  }

  public getPublisher(publisherID): Observable<IPublisher> {
    return this._http.get<IPublisher>(`http://localhost:4200/api/publishers/${publisherID}`);
  }

  public deletePublisher(publisherID: number): Observable<any> {
    return this._http.delete(`http://localhost:4200/api/publishers/${publisherID}`);
  }

  public updatePublisher(publisher: IPublisher): Observable<any> {
    return this._http.post('http://localhost:4200/api/publishers', publisher);
  }
}
