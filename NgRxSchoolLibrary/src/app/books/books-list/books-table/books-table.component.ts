import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBook } from '../../book.model';

import * as statuses from '../../book-statuses';
import { BookSortColumns } from '../book-sort-columns';

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
