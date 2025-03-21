import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthSv:OAuthService, private http:HttpClient) {
    this.configure()
   }

   tryEndpoint():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.getToken());
    return this.http.get('url-endpoint',{headers:headers})
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