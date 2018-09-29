import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as bookStatuses from '../../../books/book-statuses';
import { ILoan } from '../../loan.model';
import { ILoanEvent } from '../loan-event.model';

import { LoanSortColumns } from '../loan-sort-columns';

@Component({
  selector: 'loans-table',
  templateUrl: './loans-table.component.html',
  styleUrls: ['./loans-table.component.css']
})
export class LoansTableComponent implements OnInit {
  @Input() loans: Array<ILoan>;
  @Input() sortColumn: string;

  @Output() sortLoansList = new EventEmitter<string>();
  @Output() lendBook = new EventEmitter<ILoanEvent>();
  @Output() returnBook = new EventEmitter<ILoanEvent>();
  @Output() setBookStatusToLost = new EventEmitter<ILoanEvent>();

  public bookStatus = bookStatuses;
  public loanColumns = LoanSortColumns;
  constructor() { }

  ngOnInit() { }

  public setBookStatus(status, bookID, userID) {
    const loanEvent = <ILoanEvent> { bookID, userID };

    if (status === bookStatuses.AVAILABLE) {
      this.returnBook.emit(loanEvent);
    } else if (status === bookStatuses.BORROWED) {
      this.lendBook.emit(loanEvent);
    } else if (status === bookStatuses.LOST) {
      this.setBookStatusToLost.emit(loanEvent);
    }
  }
}
