import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  pages = [
    { title: 'Daily Log', url: '/index/daily-log' },
    { title: 'Monthly Log', url: '/index/monthly-log' },
    { title: 'Future Log', url: '/index/future-log' },
  ];

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  onLogout() {
    this.auth.logout();
  }
}
