import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../user.model';

import * as columns from '../user-sort-columns';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  @Input() users: IUser[];
  @Input() sortColumn: string;

  @Output() sortUsersList = new EventEmitter<string>();
  @Output() deleteUser = new EventEmitter<number>();

  public userColumns = columns;

  constructor() { }

  ngOnInit() {
  }

}
