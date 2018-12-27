import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBook } from '../../models/book.model';
import { IAuthor } from '../../../shared/models/author.model';
import { IPublisher } from '../../../shared/models/publisher.model';

import { Observable } from 'rxjs';
import { BookFacade } from '../../state/book.facade';
import { AppFacade } from 'src/app/state/app.facade';
import { AuthenticationFacade } from 'src/app/authentication/state/authentication.facade';

@Component({
  selector: 'book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  public isEditMode$: Observable<boolean>;
  public canEditBook$: Observable<boolean>;
  public book$: Observable<IBook>;
  public authors$: Observable<IAuthor[]>;
  public publishers$: Observable<IPublisher[]>;

  constructor(
    private _bookFacade: BookFacade,
    private _appFacade: AppFacade,
    private _authenticationFacade: AuthenticationFacade
  ) {}

  public ngOnInit(): void {
    this._appFacade.loadAuthors();
    this._appFacade.loadPublishers();
    this._bookFacade.loadBook();

    this.authors$ = this._appFacade.getAuthors();
    this.publishers$ = this._appFacade.getPublishers();
    this.book$ = this._bookFacade.getBook();

    this.isEditMode$ = this._bookFacade.getIsEditMode();
    this.canEditBook$ = this._authenticationFacade.getCanEditBook();
  }

  public ngOnDestroy(): void {
    this._bookFacade.clearBook();
  }

  public edit() {
    this._bookFacade.setIsEditMode(true);
  }

  public cancelEdit() {
    this._bookFacade.setIsEditMode(false);
  }

  public save(book: IBook) {
    this._bookFacade.save(book);
  }
}
