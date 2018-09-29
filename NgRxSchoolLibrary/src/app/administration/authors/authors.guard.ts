import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication.service';

@Injectable()
export class AuthorsGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthenticationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this._authService.canEditAuthors()) {
        this._router.navigate(['/login']);
        return false;
      }

      return true;
  }
}
