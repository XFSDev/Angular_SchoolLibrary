import { Component, OnInit } from '@angular/core';
import { IPublisherSearchFilter } from './publishers-search-filter.model';
import { IPublisher } from '../publisher.model';
import { PublishersService } from '../publishers.service';

import * as columns from '../publishers-list/publisher-sort-columns';

@Component({
  selector: 'publishers-list',
  templateUrl: './publishers-list.component.html',
  styleUrls: ['./publishers-list.component.css']
})
export class PublishersListComponent implements OnInit { 
  private _publishers: IPublisher[];
  private _publishersSearchFilter: IPublisherSearchFilter;
  private _publishersSortDesc = true;

  public filteredPublishers: IPublisher[];
  public sortColumn: string = columns.NAME;

  constructor(private _publishersService: PublishersService) { }

  ngOnInit() {
    this.loadPublishers();
  }

  filterPublishers(publishersSearchFilter: IPublisherSearchFilter) {  
    this._publishersSearchFilter = publishersSearchFilter;
    
    this.filteredPublishers = this._publishersService.filterPublishers(this._publishers, this._publishersSearchFilter);
  }

  sortPublishers(column: string) {
    this._publishersSortDesc = this.sortColumn === column ? !this._publishersSortDesc : false;
    this.sortColumn = column;
    
    if (this.filteredPublishers) {
      this._publishersService.sortPublishers(this.filteredPublishers, this.sortColumn, this._publishersSortDesc);
    }
  }

  deletePublisher(publisherID: number): void {
    if (window.confirm('Are you sure you want to delete this publisher?')) {
      this._publishersService.deletePublisher(publisherID)
      .subscribe(() => { 
        window.alert('Publisher has been deleted successfully'); 
        this.loadPublishers();
      });
    }
  }

  private loadPublishers() {
    this._publishersService.getPublishers()
      .subscribe(publishers => {
        this._publishers = publishers;
        this.filteredPublishers = this._publishersService.filterPublishers(this._publishers, this._publishersSearchFilter);
        this.sortPublishers(this.sortColumn);
      });    
  }

}
