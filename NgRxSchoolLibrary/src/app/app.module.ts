import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import { LoginInfoComponent } from './navbar/login-info/login-info.component';
import { NavBarComponent } from './navbar/nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationInterceptor } from './authentication/authentication.interceptor';
import { BooksModule } from './books/books.module';
import { LoansService } from './loans/loans.service';
import { PublishersService } from './administration/publishers/publishers.service';
import { AuthorsService } from './administration/authors/authors.service';
import { BooksService } from './books/books.service';
import { UsersService } from './administration/users/users.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MainEffects } from './state/app.effects';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BooksModule,
    StoreModule.forRoot({ main: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([MainEffects])
  ],
  declarations: [
    AppComponent,
    LoginInfoComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    AuthenticationService,
    LoansService,
    PublishersService,
    AuthorsService,
    BooksService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
