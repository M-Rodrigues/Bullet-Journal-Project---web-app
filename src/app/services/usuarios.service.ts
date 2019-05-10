
import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../interfaces/usuario';

import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService implements UsuarioInterface {

  constructor(
    private http: HttpClient, 
    private auth: AuthenticationService) { }

  criarUsuario(user: any) { // fake request
    let body = {
      user: {
        nome: user.nome,
        dia_nasc: parseInt(user.dataNasc.substring(8,10)),
        mes_nasc: parseInt(user.dataNasc.substring(5,8)),
        ano_nasc: parseInt(user.dataNasc.substring(0,4)),
        email: user.email
      },
      password: user.password
    }

    // console.log(body);

    return this.http.post(`${environment.SERVER_ADDR}/usuarios`, body).toPromise();

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({message: 'sucesso'});
    //   }, 1000)
    // })
  }

  alterarSenha() {

  }

  alterarUsuario() {

  }
}
