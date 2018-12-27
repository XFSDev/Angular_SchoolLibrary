import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthor } from 'src/app/shared/models/author.model';

@Component({
  selector: 'author-details-form',
  templateUrl: './author-details-form.component.html',
  styleUrls: ['./author-details-form.component.css']
})
export class AuthorDetailsFormComponent implements OnInit {

  @Input() author: IAuthor;

  @Output() edit = new EventEmitter<void>();

  public authorDetailsForm: FormGroup;

  constructor(private _router: Router) { }

  ngOnInit() {
    this.authorDetailsForm = new FormGroup({});
  }

  public redirectToAuthorsList() {
    this._router.navigate(['/administration/authors']);
  }
}
