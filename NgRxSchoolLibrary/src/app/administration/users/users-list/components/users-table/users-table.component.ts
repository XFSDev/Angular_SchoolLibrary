import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserSortColumns } from '../../../models/user-sort-columns';
import { IUser } from '../../../models/user.model';


@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {
  @Input() users: IUser[];
  @Input() sortColumn: string;

  @Output() sortUsersList = new EventEmitter<string>();
  @Output() deleteUser = new EventEmitter<number>();

  public userColumns = UserSortColumns;
}
