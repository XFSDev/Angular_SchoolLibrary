import { Injectable } from '@angular/core';
import * as PublisherActions from './publishers.actions';
import * as PublisherSelectors from './publishers.reducer';
import { Store, select } from '@ngrx/store';
import { IPublisherSearchFilter } from '../models/publishers-search-filter.model';
import { Observable, combineLatest } from 'rxjs';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import { PublisherSortColumns } from '../models/publisher-sort-columns';
import { IPublisher } from 'src/app/shared/models/publisher.model';
import { getPublishers } from 'src/app/state/app.reducer';
import { map } from 'rxjs/operators';

@Injectable()
export class PublishersFacade {
  constructor(private _store: Store<PublisherSelectors.IPublishersState>) {}

  public loadPublisher(): void {
    this._store.dispatch(new PublisherActions.LoadPublisherAction());
  }

  public getPublisher(): Observable<IPublisher> {
      return this._store.pipe(select(PublisherSelectors.getPublisher));
  }

  public clearPublisher(): void {
    this._store.dispatch(new PublisherActions.ClearPublisherAction);
  }

  public getIsEditMode(): Observable<boolean> {
    return this._store.pipe(select(PublisherSelectors.getIsEditMode));
  }

  public setIsEditMode(isEditMode: boolean): void {
      this._store.dispatch(new PublisherActions.SetEditModeAction(isEditMode));
  }

  public getFilteredPublishers(): Observable<IPublisher[]> {
    return combineLatest(
      this._store.pipe(select(getPublishers)),
      this._store.pipe(select(PublisherSelectors.getPublishersSearchFilter)),
      this._store.pipe(select(PublisherSelectors.getPublishersSortCriteria))
    ).pipe(
        map(([publishers, searchFilter, sortCriteria]) => {
            const filteredPublishers = this.filter(publishers, searchFilter);
            this.sort(filteredPublishers, sortCriteria.sortColumn, sortCriteria.sortOrderDesc);

            return filteredPublishers;
          })
    );
  }

  public getSortCriteria(): Observable<ISortCriteria<PublisherSortColumns>> {
      return this._store.pipe(select(PublisherSelectors.getPublishersSortCriteria));
  }

  public getPublishersSearchFilter(): Observable<IPublisherSearchFilter> {
    return this._store.pipe(select(PublisherSelectors.getPublishersSearchFilter));
  }

  public filterPublishers(PublishersSearchFilter: IPublisherSearchFilter): void {
    this._store.dispatch(new PublisherActions.FilterPublishersAction(PublishersSearchFilter));
  }

  public sortPublishers(column: PublisherSortColumns): void {
    this._store.dispatch(new PublisherActions.SortPublishersAction(column));
  }

  public deletePublisher(PublisherID: number): void {
    this._store.dispatch(new PublisherActions.DeletePublisherAction(PublisherID));
  }

  public getPublisherDeletedShowInfo(): Observable<boolean> {
    return this._store.pipe(select(PublisherSelectors.getPublisherDeletedShowInfo));
  }

  public deletePublisherSuccessShowInfo(show: boolean): void {
    this._store.dispatch(new PublisherActions.DeletePublisherSuccessShowInfoAction(show));
  }

  public save(Publisher: IPublisher): void {
    this._store.dispatch(new PublisherActions.SavePublisherAction(Publisher));
  }

  public filter(publishers: IPublisher[], publishersSearchFilter: IPublisherSearchFilter): IPublisher[] {
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

  public sort(publishers: IPublisher[], column: string, publishersSortDesc: boolean) {
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
}
