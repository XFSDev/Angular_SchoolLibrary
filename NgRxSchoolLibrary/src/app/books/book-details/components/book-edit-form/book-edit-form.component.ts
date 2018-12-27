import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBook } from '../../../models/book.model';
import { Router } from '@angular/router';
import { IAuthor } from '../../../../shared/models/author.model';
import { IPublisher } from '../../../../shared/models/publisher.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'book-edit-form',
  templateUrl: './book-edit-form.component.html',
  styleUrls: ['./book-edit-form.component.css']
})
export class BookEditFormComponent implements OnInit {
  @Input() book: IBook;
  @Input() authors: IAuthor[];
  @Input() publishers: IPublisher[];

  @Output() saveBook = new EventEmitter<IBook>();
  @Output() cancelEdit = new EventEmitter<void>();

  public maxDate: Date;

  public bookEditForm: FormGroup;

  constructor(private _router: Router, private _fb: FormBuilder) {
    this.maxDate = new Date();
  }

  ngOnInit() {
    this.bookEditForm = this._fb.group({
      bookID: [this.book.bookID],
      title: [this.book.title, [Validators.required, Validators.maxLength(100)]],
      releaseDate: [this.book.releaseDate, Validators.required],
      authorIds: [this.book.authorIds, Validators.required],
      publisherID: [this.book.publisherID, Validators.min(1)],
      additionalInformation: [this.book.additionalInformation, Validators.maxLength(1000)]
    });
  }

  public redirectToBooksList() {
    this._router.navigate(['/books']);
  }

  public save() {
    for (const field in this.bookEditForm.controls) {
      const control = this.bookEditForm.get(field);
      control.markAsTouched( {onlySelf: true } );
    }

    if (this.bookEditForm.valid) {
      this.saveBook.emit(this.bookEditForm.value);
    }
  }
}
