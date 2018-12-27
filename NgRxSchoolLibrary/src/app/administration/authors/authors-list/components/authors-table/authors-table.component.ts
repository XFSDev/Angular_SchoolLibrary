import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAuthor } from 'src/app/shared/models/author.model';
import { AuthorSortColumns } from '../../../models/author-sort-columns';

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

  public authorColumns = AuthorSortColumns;

  constructor() { }

  ngOnInit() { }
}
