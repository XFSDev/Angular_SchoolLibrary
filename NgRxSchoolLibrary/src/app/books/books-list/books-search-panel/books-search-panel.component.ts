import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPublisher } from '../../../administration/publishers/publisher.model';
import { IAuthor } from '../../../administration/authors/author.model';
import { IBookSearchFilter } from '../books-search-filter.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'books-search-panel',
  templateUrl: './books-search-panel.component.html',
  styleUrls: ['./books-search-panel.component.css']
})
export class BooksSearchPanelComponent implements OnInit, OnChanges {
  @Input() filter: IBookSearchFilter;
  @Input() publishers: IPublisher[];
  @Input() authors: IAuthor[];
  @Input() showAddButton: boolean;

  @Output() filterBooksList = new EventEmitter<IBookSearchFilter>();

  public booksSearchPanelForm: FormGroup;

  private _valueChangesSubscription: Subscription;

  constructor(private _fb: FormBuilder) {
    this.booksSearchPanelForm = this._fb.group({
      title: '',
      authorID: 0,
      publisherID: 0,
      onlyAvailable: false
    });

    this._valueChangesSubscription = this.booksSearchPanelForm.valueChanges
    .subscribe(value => this.filterBooksList.emit(<IBookSearchFilter>value));
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filter && changes.filter.currentValue) {
      if (this._valueChangesSubscription) {
        this._valueChangesSubscription.unsubscribe();
      }

      this.booksSearchPanelForm.patchValue({
        title: this.filter.title,
        authorID: this.filter.authorID,
        publisherID: this.filter.publisherID,
        onlyAvailable: this.filter.onlyAvailable
      });

      this._valueChangesSubscription = this.booksSearchPanelForm.valueChanges
    .subscribe(value => this.filterBooksList.emit(<IBookSearchFilter>value));
    }
  }
}
