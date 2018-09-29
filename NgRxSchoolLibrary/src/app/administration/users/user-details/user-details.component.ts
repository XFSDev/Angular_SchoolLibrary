import { Component, OnInit } from '@angular/core';
import { IUserRole } from '../user-role.model';
import { IUser } from '../user.model';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { IUserUpdateResult } from './user-update-result.model';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public isEditMode = false;
  public user: IUser;
  public roles: IUserRole[];
  public userUpdateResult: IUserUpdateResult;

  constructor(    
    private _route: ActivatedRoute,
    private _router: Router,    
    private _userService: UsersService) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      const userID = +params.get('id');

      if (userID === 0) {        
        this.user = <IUser> { userID: 0, role: '' };
        this.isEditMode = true;        
      } else {
        this.loadUserData(userID);
      }
    });

    this._userService.getRoles()
      .subscribe((roles: IUserRole[]) => {
        this.roles = roles;        
    });      
  }

  public edit() {
    this.isEditMode = true;
  }

  public cancelEdit() {
    this.isEditMode = false;
  }

  public save(user: IUser) {
    this._userService.updateUser(user)
      .subscribe((result: IUserUpdateResult) => {
        if (result.success) {
          this._router.navigate(['/administration/users']);
        } else {
          this.userUpdateResult = result;
        }
      });
  }

  private loadUserData(userID: number) {
    this._userService.getUser(userID)
      .subscribe(user => {
        this.user = user;
      });
  }
}
