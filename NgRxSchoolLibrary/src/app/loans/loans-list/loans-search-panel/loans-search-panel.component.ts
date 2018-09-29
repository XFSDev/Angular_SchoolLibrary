import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ILoanSearchFilter } from '../loan-search-filter.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'loans-search-panel',
  templateUrl: './loans-search-panel.component.html',
  styleUrls: ['./loans-search-panel.component.css']
})
export class LoansSearchPanelComponent implements OnInit, OnChanges {
  @Input() filter: ILoanSearchFilter;

  @Output() filterLoansList = new EventEmitter<ILoanSearchFilter>();

  public loansSearchPanelForm: FormGroup;

  get statuses(): FormArray {
    return <FormArray>this.loansSearchPanelForm.get('bookStatuses');
  }

  private _valueChangesSubscription: Subscription;

  constructor(private _fb: FormBuilder) {
    this.loansSearchPanelForm = this._fb.group({
      title: '',
      user: '',
      bookStatuses: this._fb.array([])
    });
  }

  ngOnInit() {
    this._valueChangesSubscription = this.loansSearchPanelForm.valueChanges
      .subscribe(value => this.filterLoansList.emit(<ILoanSearchFilter>value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filter && changes.filter.currentValue && (!changes.filter.previousValue ||
      (changes.filter.currentValue.title !== changes.filter.previousValue.title ||
        changes.filter.currentValue.user !== changes.filter.previousValue.user ||
        changes.filter.currentValue.bookStatuses.length !== changes.filter.previousValue.bookStatuses.length))) {
      const bookStatusesFormArray = <FormArray>this.loansSearchPanelForm.get('bookStatuses');

      while (bookStatusesFormArray.length > 0) {
        bookStatusesFormArray.removeAt(0);
      }

      if (this.filter) {
        this.filter.bookStatuses.forEach(status => bookStatusesFormArray.push(this.buildBookStatusGroup()));
      }

      if (this._valueChangesSubscription) {
        this._valueChangesSubscription.unsubscribe();
      }

      this.loansSearchPanelForm.patchValue({
        title: this.filter.title,
        user: this.filter.user,
        bookStatuses: this.filter.bookStatuses
      });

      this._valueChangesSubscription = this.loansSearchPanelForm.valueChanges
        .subscribe(value => this.filterLoansList.emit(<ILoanSearchFilter>value));
    }
  }

  private buildBookStatusGroup(): FormGroup {
    return this._fb.group({
      id: 0,
      name: '',
      selected: false
    });
  }
}
