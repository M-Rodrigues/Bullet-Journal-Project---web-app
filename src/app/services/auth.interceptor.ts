import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
    constructor(private authService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`AuthInterceptor:: ${req.method} -> ${req.url}`)

        // if (this.needToken(req.url)) {
        //     console.log("request needs authentication");

        //     this.authService.getToken().then(token => {
        //         console.log(token);
        //         if (token) {
        //             req = req.clone({
        //                 setHeaders: {
        //                     Authorization: `Bearer ${token}`
        //                 }
        //             })
        //         }
        //     })
        // }
        // return next.handle(req);

        return this.authService.getTokenObservable()
            .pipe(mergeMap((token:any) => {
                // console.log(token);
                if (token) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: token
                        }
                    })
                }
                // console.log(req)
                return next.handle(req)
            }),)
    }

    private needToken(url: string) {
        return url.indexOf('auth/login') === -1 && url.indexOf('auth/register') === -1;
    }
}