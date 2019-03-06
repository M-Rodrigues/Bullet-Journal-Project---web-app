import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly TOKEN_KEY = 'bujo-user-token';
  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage, 
    private plt: Platform, 
    private http: HttpClient
  ) {   
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  getToken() {
    return this.storage.get(this.TOKEN_KEY); 
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
    
    // return this.http.put(`${environment.SERVER_ADDR}/auth/login`, body).toPromise();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({token: 'my-token'})
      }, 1000)
    })
  }

  logout() {
    return this.storage.remove(this.TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}
