import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBook } from '../../book.model';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'book-details-form',
  templateUrl: './book-details-form.component.html',
  styleUrls: ['./book-details-form.component.css']
})
export class BookDetailsFormComponent implements OnInit {
  @Input() book: IBook; 
  @Input() showEditButton: boolean;

  @Output() edit = new EventEmitter<void>();

  public bookDetailsForm: FormGroup;

  constructor(private _router: Router) { }

  ngOnInit() {
    this.bookDetailsForm = new FormGroup({});
  }

  public redirectToBooksList() {
    this._router.navigate(['/books']);
  }
}
