import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPublisher } from '../../shared/models/publisher.model';
import { IPublisherSearchFilter } from './models/publishers-search-filter.model';

import { PublisherSortColumns } from './models/publisher-sort-columns';

@Injectable()
export class PublishersService {

  constructor(private _http: HttpClient) {}

  public filterPublishers(publishers: IPublisher[], publishersSearchFilter: IPublisherSearchFilter): IPublisher[] {
    if (!publishers || !publishersSearchFilter) {
      return publishers;
    }

    return publishers.filter(publisher => {
      const nameQuery = !publishersSearchFilter.name || publishersSearchFilter.name.length === 0 ||
            publisher.name.toUpperCase().includes(publishersSearchFilter.name.toUpperCase());

      const addressQuery = !publishersSearchFilter.address || publishersSearchFilter.address.length === 0 ||
            publisher.address.toUpperCase().includes(publishersSearchFilter.address.toUpperCase());

      const additionalInformationQuery = !publishersSearchFilter.additionalInformation ||
            publishersSearchFilter.additionalInformation.length === 0 ||
            publisher.additionalInformation.toUpperCase().includes(publishersSearchFilter.additionalInformation.toUpperCase());

      return nameQuery && addressQuery && additionalInformationQuery;
    });
  }

  public sortPublishers(publishers: IPublisher[], column: string, publishersSortDesc: boolean) {
    publishers.sort((first, second) => {
      let firstField: any;
      let secondField: any;

      if (column === PublisherSortColumns.Name) {
        firstField = first.name.toUpperCase();
        secondField = second.name.toUpperCase();
      } else if (column === PublisherSortColumns.Address) {
        firstField = first.address.toUpperCase();
        secondField = second.address.toUpperCase();
      } else if (column === PublisherSortColumns.AdditionalInformation) {
        firstField = first.additionalInformation.toUpperCase();
        secondField = second.additionalInformation.toUpperCase();
      } else {
        return 0;
      }

      let comparison = firstField > secondField ? 1 : (firstField < secondField ? -1 : 0);
      if (publishersSortDesc) {
        comparison = -comparison;
      }

      return comparison;
    });
  }

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
