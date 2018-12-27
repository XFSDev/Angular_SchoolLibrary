import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPublisher } from '../../../../../shared/models/publisher.model';

import { PublisherSortColumns } from '../../../models/publisher-sort-columns';

@Component({
  selector: 'publishers-table',
  templateUrl: './publishers-table.component.html',
  styleUrls: ['./publishers-table.component.css']
})
export class PublishersTableComponent implements OnInit {
  @Input() publishers: IPublisher[];
  @Input() sortColumn: string;

  @Output() sortPublishersList = new EventEmitter<string>();
  @Output() deletePublisher = new EventEmitter<number>();

  public publisherColumns = PublisherSortColumns;

  constructor() { }

  ngOnInit() {
  }

}