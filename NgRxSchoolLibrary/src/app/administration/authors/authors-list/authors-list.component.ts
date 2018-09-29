import { Component, OnInit } from '@angular/core';
import { IAuthorSearchFilter } from './authors-search-filter.model';
import { IAuthor } from '../author.model';
import { AuthorsService } from '../authors.service';

import * as columns from '../authors-list/author-sort-columns';

@Component({
  selector: 'authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit { 
  private _authors: IAuthor[];
  private _authorsSearchFilter: IAuthorSearchFilter;
  private _authorsSortDesc = true;

  public filteredAuthors: IAuthor[];
  public sortColumn: string = columns.FULL_NAME;

  constructor(private _authorsService: AuthorsService) { }

  ngOnInit() {
    this.loadAuthors();
  }

  filterAuthors(authorsSearchFilter: IAuthorSearchFilter) {  
    this._authorsSearchFilter = authorsSearchFilter;
    
    this.filteredAuthors = this._authorsService.filterAuthors(this._authors, this._authorsSearchFilter);
  }

  sortAuthors(column: string) {
    this._authorsSortDesc = this.sortColumn === column ? !this._authorsSortDesc : false;
    this.sortColumn = column;
    
    if (this.filteredAuthors) {
      this._authorsService.sortAuthors(this.filteredAuthors, this.sortColumn, this._authorsSortDesc);
    }
  }

  deleteAuthor(authorID: number): void {
    if (window.confirm('Are you sure you want to delete this author?')) {
      this._authorsService.deleteAuthor(authorID)
      .subscribe(() => { 
        window.alert('Author has been deleted successfully'); 
        this.loadAuthors();
      });
    }
  }

  private loadAuthors() {
    this._authorsService.getAuthors()
      .subscribe(authors => {
        this._authors = authors;
        this.filteredAuthors = this._authorsService.filterAuthors(this._authors, this._authorsSearchFilter);
        this.sortAuthors(this.sortColumn);
      });    
  }

}
