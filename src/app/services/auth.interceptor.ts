import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
    constructor(private authService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`AuthInterceptor:: ${req.method} -> ${req.url}`)

        console.log("request needs authentication");
        return this.authService.getTokenObservable()
            .pipe(mergeMap((token:any) => {
                console.log(token);
                if (token) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: token
                        }
                    })
                }
                console.log(req)
                return next.handle(req)
            }),)
    }

    private needToken(req: any) {
        return req.url.indexOf('auth/login') === -1 
            || req.url.indexOf('auth/recover') === -1
            || (req.url.indexOf('usuarios') && req.url.method == 'POST');
    }
}