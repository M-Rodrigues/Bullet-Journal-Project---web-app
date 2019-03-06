import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  user = {email: null}
  
  constructor() { }

  ngOnInit() {
  }

  onRecoverPassword(form: NgForm) {
    let user = form.value;
    console.log(user)
  }
}
