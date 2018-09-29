import { Component, OnInit } from '@angular/core';
import { IUserSearchFilter, IUserRoleSearch } from './users-search-filter.model';
import { IUser } from '../user.model';
import { UsersService } from '../users.service';

import * as columns from '../users-list/user-sort-columns';
import { IUserRole } from '../user-role.model';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit { 
  private _users: IUser[];
  private _usersSortDesc = true;
  private _filter: IUserSearchFilter;

  public defaultFilter: IUserSearchFilter;
  public filteredUsers: IUser[];
  public sortColumn: string = columns.FULL_NAME;

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
    this._usersService.getRoles()
      .subscribe((roles: IUserRole[]) => {
       
        const userRoleSearchFilter = roles.map(role => <IUserRoleSearch>{
          id: role.id,
          name: role.name,
          selected: true
        });

        this.defaultFilter = <IUserSearchFilter> {
          fullName: '',
          email: '',     
          address: '',       
          userRoles: userRoleSearchFilter
        };

        this._filter = {...this.defaultFilter};

        this.loadUsers();
      });       
  }

  filterUsers(usersSearchFilter: IUserSearchFilter) {  
    this._filter = usersSearchFilter;
    
    this.filteredUsers = this._usersService.filterUsers(this._users, this._filter);
  }

  sortUsers(column: string) {
    this._usersSortDesc = this.sortColumn === column ? !this._usersSortDesc : false;
    this.sortColumn = column;
    
    if (this.filteredUsers) {
      this._usersService.sortUsers(this.filteredUsers, this.sortColumn, this._usersSortDesc);
    }
  }

  deleteUser(userID: number): void {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this._usersService.deleteUser(userID)
      .subscribe(() => { 
        window.alert('User has been deleted successfully'); 
        this.loadUsers();
      });
    }
  }

  private loadUsers() {
    this._usersService.getUsers()
      .subscribe(users => {
        this._users = users;
        this.filteredUsers = this._usersService.filterUsers(this._users, this._filter);
        this.sortUsers(this.sortColumn);
      });    
  }

}
