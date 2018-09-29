import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAuthor } from '../../author.model';

import * as columns from '../author-sort-columns';

@Component({
  selector: 'authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.css']
})
export class AuthorsTableComponent implements OnInit {
  @Input() authors: IAuthor[];
  @Input() sortColumn: string;

  @Output() sortAuthorsList = new EventEmitter<string>();
  @Output() deleteAuthor = new EventEmitter<number>();

  public authorColumns = columns;

  constructor() { }

  ngOnInit() {
  }

}
