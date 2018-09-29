import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'loans', loadChildren: './loans/loans.module#LoansModule' },
    { path: 'administration', loadChildren: './administration/administration.module#AdministrationModule'}
];
