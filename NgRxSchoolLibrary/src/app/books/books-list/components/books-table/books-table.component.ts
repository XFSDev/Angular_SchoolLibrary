import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBook } from '../../../models/book.model';

import * as statuses from '../../../../shared/models/book-statuses';
import { BookSortColumns } from '../../../models/book-sort-columns';

@Component({
  selector: 'books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent implements OnInit {
  @Input() books: IBook[];
  @Input() sortColumn: string;
  @Input() showRequestBook: boolean;
  @Input() showDeleteButton: boolean;

  @Output() sortBooksList = new EventEmitter<string>();
  @Output() requestBook = new EventEmitter<number>();
  @Output() deleteBook = new EventEmitter<number>();

  public bookStatuses = statuses;
  public bookSortColumns = BookSortColumns;

  constructor() { }

  ngOnInit() { }
}