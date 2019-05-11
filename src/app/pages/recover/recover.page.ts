import { LoadingController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  user:any = {email: null, resposta: null, new_psw: null, new_psw2: null}
  
  constructor(
    private usuarioService: UsuariosService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async onRecoverPassword(form: NgForm) {
    let user = form.value;
    console.log(user)

    const loading = await this.loadingCtrl.create()
    loading.present()
    
    this.usuarioService.recuperarSenhaComPergunta(user)
      .then((res:any) => {
        console.log(res)
        loading.dismiss()
      })
      .catch((err:any) => {
        console.log(err)
        loading.dismiss()
      });
  }
}
