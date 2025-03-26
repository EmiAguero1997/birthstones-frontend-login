import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { redirectTopazUrl } from '../../services/redirect-topaz-url';

@Component({
  selector: 'app-home',
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  token!:string;
  constructor(private authSv: AuthService){
    
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.getToken();
    }, 1000);
  }

  async getToken(){
    this.token = await this.authSv.getToken();
    console.log('token: ', this.token);
    window.location.href = redirectTopazUrl.url+'?token='+this.token;
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
