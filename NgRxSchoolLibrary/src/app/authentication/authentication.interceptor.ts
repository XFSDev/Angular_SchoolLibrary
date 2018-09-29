import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthenticationService, private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;

    if (!!this._authService.currentUser) {
        request = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + this._authService.currentUser.token)
        });
    }

    return next.handle(request)
        .pipe(
            tap(evt => {},
                (error: any) => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401 || error.status === 403) {
                            this._router.navigate(['/login']);
                        }
                    }
                }
            )
        );
  }
}
