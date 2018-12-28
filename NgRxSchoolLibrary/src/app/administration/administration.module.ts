import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthorsListComponent } from './authors/authors-list/containers/authors-list.component';

import { administrationRoutes } from './routes';
import { AuthorsSearchPanelComponent } from './authors/authors-list/components/authors-search-panel/authors-search-panel.component';
import { AuthorsTableComponent } from './authors/authors-list/components/authors-table/authors-table.component';
import { AuthorDetailsComponent } from './authors/author-details/containers/author-details.component';

import { AuthorsGuard } from './authors/authors.guard';
import { AuthorGuard } from './authors/author.guard';
import { PublisherGuard } from './publishers/publisher.guard';
import { PublishersGuard } from './publishers/publishers.guard';
import { UsersGuard } from './users/users.guard';
import { UserGuard } from './users/user.guard';

import { PublishersListComponent } from './publishers/publishers-list/containers/publishers-list.component';
import { PublishersSearchPanelComponent } from './publishers/publishers-list/components/publishers-search-panel/publishers-search-panel.component';
import { PublishersTableComponent } from './publishers/publishers-list/components/publishers-table/publishers-table.component';
import { PublisherDetailsComponent } from './publishers/publisher-details/containers/publisher-details.component';
import { PublisherDetailsFormComponent } from './publishers/publisher-details/components/publisher-details-form/publisher-details-form.component';
import { PublisherEditFormComponent } from './publishers/publisher-details/components/publisher-edit-form/publisher-edit-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersSearchPanelComponent } from './users/users-list/users-search-panel/users-search-panel.component';
import { UsersTableComponent } from './users/users-list/users-table/users-table.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserDetailsFormComponent } from './users/user-details/user-details-form/user-details-form.component';
import { UserEditFormComponent } from './users/user-details/user-edit-form/user-edit-form.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthorsEffects } from './authors/state/authors.effects';
import { AuthorsFacade } from './authors/state/authors.facade';
import { reducers } from './state/administration.reducer';
import { AuthorDetailsFormComponent } from './authors/author-details/components/author-details-form/author-details-form.component';
import { AuthorEditFormComponent } from './authors/author-details/components/author-edit-form/author-edit-form.component';
import { PublishersEffects } from './publishers/state/publishers.effects';
import { PublishersFacade } from './publishers/state/publishers.facade';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(administrationRoutes),
    ReactiveFormsModule,
    BsDatepickerModule,
    HttpClientModule,

    StoreModule.forFeature('administration', reducers),
    EffectsModule.forFeature([AuthorsEffects, PublishersEffects])
  ],
  declarations: [
    AuthorsListComponent,
    AuthorsSearchPanelComponent,
    AuthorsTableComponent,
    AuthorDetailsComponent,
    AuthorDetailsFormComponent,
    AuthorEditFormComponent,
    PublishersListComponent,
    PublishersSearchPanelComponent,
    PublishersTableComponent,
    PublisherDetailsComponent,
    PublisherDetailsFormComponent,
    PublisherEditFormComponent,
    UsersListComponent,
    UsersSearchPanelComponent,
    UsersTableComponent,
    UserDetailsComponent,
    UserDetailsFormComponent,
    UserEditFormComponent
  ],
  providers: [
    AuthorsFacade,
    AuthorsGuard,
    AuthorGuard,
    PublishersFacade,
    PublisherGuard,
    PublishersGuard,
    UsersGuard,
    UserGuard
  ]
})
export class AdministrationModule { }
