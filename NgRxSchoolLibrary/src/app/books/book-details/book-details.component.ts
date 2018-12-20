import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBook } from '../book.model';
import { IAuthor } from '../../administration/authors/author.model';
import { IPublisher } from '../../administration/publishers/publisher.model';

import { Observable } from 'rxjs';
import { BookFacade } from '../state/book.facade';
import { AppFacade } from 'src/app/state/app.facade';
import { takeWhile } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  private _componentActive: boolean;

  public isEditMode = false;
  public book$: Observable<IBook>;
  public authors$: Observable<IAuthor[]>;
  public publishers$: Observable<IPublisher[]>;

  constructor(
    private _bookFacade: BookFacade,
    private _appFacade: AppFacade,
    public authService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this._componentActive = true;

    this._appFacade.loadAuthors();
    this._appFacade.loadPublishers();
    this._bookFacade.loadBook();

    this.authors$ = this._appFacade.getAuthors();
    this.publishers$ = this._appFacade.getPublishers();
    this.book$ = this._bookFacade.getBook();

    this._bookFacade.getIsEditMode().pipe(
      takeWhile(() => this._componentActive)
    )
    .subscribe((isEdit: boolean) => this.isEditMode = isEdit);
  }

  public ngOnDestroy(): void {
    this._componentActive = false;
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
