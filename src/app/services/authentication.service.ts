import { BulletHandlerService } from './bullet-handler.service';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly TOKEN_KEY = 'bujo-user-token';
  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage, 
    private plt: Platform, 
    private http: HttpClient,
    private bj: BulletHandlerService
  ) {   
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  getToken() {
    return this.storage.get(this.TOKEN_KEY); 
  }

  getTokenObservable(){
    return from(this.getToken())
  }

  checkToken() {
    this.getToken().then(res => {
      console.log('checkToken:: ' + res);
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  login(token: string) {
    return this.storage.set(this.TOKEN_KEY, token).then(() => {
      this.authenticationState.next(true);
    });
  }

  loginWithEmailAndPassword(email, psw) { // fake request
    let body = {
      email: email,
      password: psw
    }
    
    return this.http.put(`${environment.SERVER_ADDR}/auth/login`, body).toPromise()
  }

  logout() {
    return this.storage.remove(this.TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkAuth(promise:Promise<any>) {
    return new Promise((resolve, reject) => {
      promise
        .then((res:any) => {
          if (res.status < 0) {
            this.logout()
            if (res.status === -1)
              this.bj.showToastSuccess("Login expirado. Faça login novamente")
            else if (res.status === -2) {
              this.bj.showToastSuccess("Requisição sem token...")
            }
          }
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }
}
