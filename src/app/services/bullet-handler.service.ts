import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { CustomException, MyExc, CustomResponse, MyRes } from '../interfaces/excecoes';

@Injectable({
  providedIn: 'root'
})
export class BulletHandlerService {
  constructor(private toastController: ToastController) { 
  }

  handleError(error: CustomException) {
    
    return error;
  }

  handleResponse(res: CustomResponse) {
    let code = res.code;
    
    if (code === MyRes.SUCESSO_CRIAR_USUARIO) {
      this.showToastResponseMessage("Usuário criado com sucesso.");
    }

    return res;
  }
  
  private async showToastErrorMessage(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'X',
      duration: 3000,
      color: 'danger'
    });
    toast.present();
  }

  private async showToastResponseMessage(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'X',
      duration: 3000
    });
    toast.present();
  }

  showToastSuccess(msg: string) {
    this.showToastResponseMessage(msg);
  }
  
  showToastError(msg: string) {
    this.showToastErrorMessage(msg);
  }



  showAlerts() {
    this.showToastErrorMessage("Teste Mensagem de Erro");
    setTimeout(() => this.showToastResponseMessage("Teste Mensagem de Resposta"), 3000)
  }
}
