
import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../interfaces/usuario';

import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService implements UsuarioInterface {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  criarUsuario(user: any) { // fake request
    // return this.auth.loginWithEmailAndPassword(user.email, user.password).toPromise()
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({message: 'sucesso'});
      }, 1000)
    })
  }

  alterarSenha() {

  }

  alterarUsuario() {

  }
}
