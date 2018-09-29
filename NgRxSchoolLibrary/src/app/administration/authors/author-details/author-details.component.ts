import { Component, OnInit } from '@angular/core';
import { IAuthor } from '../author.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {
  public isEditMode = false;
  public author: IAuthor;

  constructor(private _route: ActivatedRoute, private _router: Router, private _authorsService: AuthorsService) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      const authorID = +params.get('id');

      if (authorID === 0) {        
        this.author = <IAuthor> { authorID: 0 };
        this.isEditMode = true;        
      } else {
        this.loadAuthorData(authorID);
      }
    });
  }

  public edit() {
    this.isEditMode = true;
  }

  public cancelEdit() {
    this.isEditMode = false;
  }

  public save(author: IAuthor) {    
    this._authorsService.updateAuthor(author)
      .subscribe(() => {
        this._router.navigate(['/administration/authors']);
      });
  }

  private loadAuthorData(authorID: number) {
    this._authorsService.getAuthor(authorID)
      .subscribe(author => {
        this.author = author;
      });
  }
}
