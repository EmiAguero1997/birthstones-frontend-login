import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private fb:FormBuilder,
    private authSv: AuthService
  ){
    this.loginForm = this.fb.group(
      {
        email:[''],
        password:['']
      }
    )
  }

  ngOnInit(): void {
    
  }

  login(){
    console.log('login');
    this.authSv.login();
  }
}
