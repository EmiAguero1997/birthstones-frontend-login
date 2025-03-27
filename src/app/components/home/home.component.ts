import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { redirectTopazUrl } from '../../services/redirect-topaz-url';
import { Router } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, ImageModule, ProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  token!:string;
  identity!:any;
  loading = true;
  constructor(private authSv: AuthService, private router: Router){
    
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.getToken();
      this.getIdentity();
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.loading = false;
  }

  async getIdentity(){
    this.identity = await this.authSv.getIdentity();
    let identity = JSON.stringify(this.identity);
    identity = btoa(identity);
    if (this.authSv.hasValidToken()) {
      await this.authSv.saveUserRole(); // Guarda el rol solo si se logueó
      await this.authSv.getUserRole(); // Esto lo mostrará en consola
      window.location.href = redirectTopazUrl.url+'?token='+this.token+'&identity='+identity;
    } else{
      alert('Error al ingresar');
      this.router.navigate(['/login']);
    }
    
  }

  async getToken(){
    this.token = await this.authSv.getToken();
    console.log('token: ', this.token);
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
