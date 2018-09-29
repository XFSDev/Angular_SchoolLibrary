import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IUserRole } from '../../user-role.model';
import { IUserSearchFilter, IUserRoleSearch } from '../users-search-filter.model';

@Component({
  selector: 'users-search-panel',
  templateUrl: './users-search-panel.component.html',
  styleUrls: ['./users-search-panel.component.css']
})
export class UsersSearchPanelComponent implements OnInit, OnChanges {
  @Input() filter: IUserSearchFilter;
    
  @Output() filterUsersList = new EventEmitter<IUserSearchFilter>();

  public usersSearchPanelForm: FormGroup;

  get roles(): FormArray {
    return <FormArray>this.usersSearchPanelForm.get('userRoles');
  }

  constructor(private _fb: FormBuilder) { 
    this.usersSearchPanelForm = this._fb.group({
      fullName: '',
      email: '',     
      address: '',       
      userRoles: this._fb.array([])              
    });    
  }

  ngOnInit() {    
  }

  ngOnChanges(changes: SimpleChanges): void {    
    if (!!changes.filter && changes.filter.currentValue !== changes.filter.previousValue) {
      this.initForm();
    }    
  }

  private initForm(): void {
    if (!!this.filter) {
      const userRolesFormArray = <FormArray>this.usersSearchPanelForm.get('userRoles');  
      
      while (userRolesFormArray.length > 0) {
        userRolesFormArray.removeAt(0);  
      }
      
      this.filter.userRoles.forEach(status => userRolesFormArray.push(this.buildUserRoleGroup()));
          
      this.usersSearchPanelForm.setValue({
        fullName: this.filter.fullName,
        email: this.filter.email,
        address: this.filter.address,
        userRoles: this.filter.userRoles
      });

      this.usersSearchPanelForm.valueChanges.subscribe(value => {
        this.filterUsersList.emit(value);
      });   
    }
  }

  private buildUserRoleGroup(): FormGroup {
    return this._fb.group({
           id: 0,
           name: '',
           selected: false
         });
  }
}
