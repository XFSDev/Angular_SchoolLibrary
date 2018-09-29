import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IBook } from '../book.model';
import { AuthenticationService } from '../../authentication/authentication.service';
import { BooksService } from '../books.service';
import { IAuthor } from '../../administration/authors/author.model';
import { IPublisher } from '../../administration/publishers/publisher.model';
import { AuthorsService } from '../../administration/authors/authors.service';
import { PublishersService } from '../../administration/publishers/publishers.service';

@Component({
  selector: 'book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  public isEditMode = false;
  public book: IBook;
  public authors: IAuthor[];
  public publishers: IPublisher[];

  constructor(
    public authService: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router,    
    private _bookService: BooksService,
    private _publishersService: PublishersService, 
    private _authorsService: AuthorsService
  ) { 
    
  }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      const bookID = +params.get('id');

      if (bookID === 0) {
        if (this.authService.canEditBook()) {
          this.book = <IBook> { bookID: 0, publisherID: 0 };
          this.isEditMode = true;
        } else {
          this._router.navigate(['/login']);
        }
      } else {
        this.loadBookData(bookID);
      }
    });

    this._publishersService.getPublishers()
      .subscribe((publishers: IPublisher[]) => {
        this.publishers = publishers;        
      });

      this._authorsService.getAuthors()
        .subscribe((authors: IAuthor[]) => {
          this.authors = authors;
        });
  }

  public edit() {
    this.isEditMode = true;
  }

  public cancelEdit() {
    this.isEditMode = false;
  }

  public save(book: IBook) {    
    this._bookService.updateBook(book)
      .subscribe(() => {
        this._router.navigate(['/books']);
      });
  }

  private loadBookData(bookID: number) {
    this._bookService.getBook(bookID)
      .subscribe(book => {
        this.book = book;
      });
  }
}
