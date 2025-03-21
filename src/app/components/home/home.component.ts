import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [ButtonModule],
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

  callExampleEndpoint(){
    this.authSv.tryEndpoint().subscribe(
      response=>{
        console.log('response: ',response);
      },
      error=>{
        console.log('error: ', error);
      }
    )
  }
}
