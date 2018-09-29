import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAuthor } from '../../author.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'author-edit-form',
  templateUrl: './author-edit-form.component.html',
  styleUrls: ['./author-edit-form.component.css']
})
export class AuthorEditFormComponent implements OnInit {
  @Input() author: IAuthor;
  @Output() saveAuthor = new EventEmitter<IAuthor>();
  @Output() cancelEdit = new EventEmitter<void>();
  
  public authorEditForm: FormGroup;

  constructor(private _router: Router, private _fb: FormBuilder) { }

  ngOnInit() {
    this.authorEditForm = this._fb.group({
      authorID: [this.author.authorID],
      firstName: [this.author.firstName, [Validators.required, Validators.maxLength(50)]],
      lastName: [this.author.lastName, [Validators.required, Validators.maxLength(50)]],
      additionalInformation: [this.author.additionalInformation, Validators.maxLength(1000)]
    });
  }

  public redirectToAuthorsList() {
    this._router.navigate(['/administration/authors']);
  }

  public save() {    
    for (const field in this.authorEditForm.controls) {
      const control = this.authorEditForm.get(field);
      control.markAsTouched( {onlySelf: true } );
    }

    if (this.authorEditForm.valid) {
      this.saveAuthor.emit(this.authorEditForm.value);
    }
  }
}
