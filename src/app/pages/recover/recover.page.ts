import { BulletHandlerService } from './../../services/bullet-handler.service';
import { LoadingController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  user:any = {email: null, resposta: null, new_psw: null, new_psw2: null}
  
  constructor(
    private usuarioService: UsuariosService,
    private loadingCtrl: LoadingController,
    private bulletHandler: BulletHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async onRecoverPassword(form: NgForm) {
    let user = form.value;
    console.log(user)

    const loading = await this.loadingCtrl.create()
    loading.present()
    
    this.usuarioService.recuperarSenhaComPergunta(user)
      .then((res:any) => {
        console.log("onResolve::")
        console.log(res.status == 0)
        
        // Error Handler
        if (res.status == 0) {
          this.bulletHandler.showToastSuccess("Senha trocada com sucesso!")
          this.router.navigate(['login'])
        }
        else if (res.status == 1)
          this.bulletHandler.showToastError("Email não cadastrado.")
        else if (res.status == 2)
          this.bulletHandler.showToastError("Senhas não conferem.")
        else if (res.status == 3)
          this.bulletHandler.showToastError("Resposta de segurança não validada.")
        else if (!res.status)
          this.bulletHandler.showToastError(JSON.stringify(res));

      })
      .catch((err:any) => {
        console.log("onCatch::")
        console.log(err)
        this.bulletHandler.showToastError(JSON.stringify(err));
      })
      .finally(() => {
        loading.dismiss()
      })
  }
}
