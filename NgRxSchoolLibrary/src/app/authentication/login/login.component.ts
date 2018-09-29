import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from '../login/login.model';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public invalidUsernamePassword: boolean;

  constructor(private _router: Router, private _authService: AuthenticationService) { }

  ngOnInit() {
    const username = new FormControl('', Validators.required);
    const password = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({
      username: username,
      password: password
    });
  }

  signIn(loginData: ILogin) {
    // tslint:disable-next-line:forin
    for (const field in this.loginForm.controls) {
      const control = this.loginForm.get(field);
      control.markAsTouched( {onlySelf: true } );
    }

    if (this.loginForm.valid) {
      this.invalidUsernamePassword = false;

      this._authService.login(loginData)
        .subscribe(() => {
          this._router.navigate(['/home']);
        },
        error => {
          if (error === 400) {
            this.invalidUsernamePassword = true;
            this.loginForm.patchValue( { password: '' } );
          }
        });
    }
  }
}
