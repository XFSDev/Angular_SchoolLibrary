import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../models/user.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.css']
})
export class UserDetailsFormComponent implements OnInit {

  @Input() user: IUser; 

  @Output() edit = new EventEmitter<void>();

  public userDetailsForm: FormGroup;

  constructor(private _router: Router) { }

  ngOnInit() {
    this.userDetailsForm = new FormGroup({});
  }

  public redirectToUsersList() {
    this._router.navigate(['/administration/users']);
  }

}
