import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthSv:OAuthService, private http:HttpClient) {
    this.configure()
   }

   configure(){
    this.oauthSv.configure(authCodeFlowConfig);
    this.oauthSv.loadDiscoveryDocumentAndTryLogin();
   }

  login(){
    this.oauthSv.initLoginFlow();
  }

  logout(){
    this.oauthSv.logOut();
    this.oauthSv.revokeTokenAndLogout();
  }

  getToken(){
    return this.oauthSv.getAccessToken();
  }

  getIdentity(){
    return this.oauthSv.getIdentityClaims();
  }
}