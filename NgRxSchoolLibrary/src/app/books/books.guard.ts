import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';
import { BookFacade } from './state/book.facade';

@Injectable()
export class BooksGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthenticationService,
    private _bookFacade: BookFacade) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (next.params && next.params.id && (+next.params.id) === 0) {
        if (!this._authService.canEditBook()) {
          this._router.navigate(['/login']);
          return false;
        }

        this._bookFacade.setIsEditMode(true);
      } else {
        this._bookFacade.setIsEditMode(false);
      }

      return true;
  }
}
