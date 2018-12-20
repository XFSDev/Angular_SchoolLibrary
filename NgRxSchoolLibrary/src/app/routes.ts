import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'login', loadChildren: './authentication/authentication.module#AuthenticationModule' },
    { path: 'books', loadChildren: './books/books.module#BooksModule'},
    { path: 'loans', loadChildren: './loans/loans.module#LoansModule' },
    { path: 'administration', loadChildren: './administration/administration.module#AdministrationModule'},
    { path: '', redirectTo: '/home', pathMatch: 'full'}
];
