import { BulletHandlerService } from './../../services/bullet-handler.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MyRes } from 'src/app/interfaces/excecoes';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user:any = {email: null, senha: null}

  constructor(
    private auth: AuthenticationService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private bulletHandler: BulletHandlerService
  ) {
    
  }

  ngOnInit() {
  }

  async onLogin(form: NgForm) { // TODO: validação do formulário | tratar todos os erros    
    let user = form.value;
    console.log(user);

    const loading = await this.loadingCtrl.create()
    loading.present()

    this.auth.loginWithEmailAndPassword(user.email, user.password)
      .then((res:any) => {
        // Error Handler
        if (res.status == 0) {
          this.auth.login(res.token)
        }
        else if (res.status == 1)
          this.bulletHandler.showToastError("Email não cadastrado.")
        else if (res.status == 2)
          this.bulletHandler.showToastError("Senha não confere.")
        else if (!res.status)
          this.bulletHandler.showToastError(JSON.stringify(res));
      })
      .catch((err:any) => {
        console.log(err)
        this.bulletHandler.showToastError(JSON.stringify(err));
      })
      .finally(() => {
        loading.dismiss()
      })
  }
}
