import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private authSv: AuthService){
    let token = this.authSv.getToken();
    let identity = this.authSv.getIdentity();
    console.log('token: ', token);
    console.log('identity: ', identity);
  }
}
