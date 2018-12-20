import { Routes } from '@angular/router';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksGuard } from './books.guard';

export const booksRoutes: Routes = [
    { path: 'books', component: BooksListComponent },
    { path: 'books/:id', component: BookDetailsComponent, canActivate: [BooksGuard] }

];
