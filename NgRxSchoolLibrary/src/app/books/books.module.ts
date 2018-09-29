import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BooksListComponent } from './books-list/books-list.component';
import { BooksSearchPanelComponent } from './books-list/books-search-panel/books-search-panel.component';
import { BooksTableComponent } from './books-list/books-table/books-table.component';

import { booksRoutes } from './routes';

import { BookDetailsComponent } from './book-details/book-details.component';
import { BookDetailsFormComponent } from './book-details/book-details-form/book-details-form.component';
import { BookEditFormComponent } from './book-details/book-edit-form/book-edit-form.component';
import { reducer } from './state/book.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './state/book.effects';


@NgModule({
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild(booksRoutes),
    HttpClientModule,
    StoreModule.forFeature('books', reducer),
    EffectsModule.forFeature([BookEffects])
  ],
  declarations: [
    BooksListComponent,
    BooksSearchPanelComponent,
    BooksTableComponent,
    BookDetailsComponent,
    BookDetailsFormComponent,
    BookEditFormComponent
  ],
  providers: []
})
export class BooksModule { }