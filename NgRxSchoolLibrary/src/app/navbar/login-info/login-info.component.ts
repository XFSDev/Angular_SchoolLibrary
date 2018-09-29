import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.css']
})
export class LoginInfoComponent implements OnInit {

  constructor(public authService: AuthenticationService,
    private _router: Router) { }

  ngOnInit() {
  }

  public logoff() {
    this.authService.logOff();
    this._router.navigate(['/home']);
  }

}
