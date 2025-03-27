import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

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

   hasValidToken(){
    return this.oauthSv.hasValidAccessToken();
   }

  login(){
    this.oauthSv.initLoginFlow();
  }

  logout(){
    this.oauthSv.logOut();
    this.oauthSv.revokeTokenAndLogout();
  }

  async getToken(){
    return this.oauthSv.getIdToken();
  }

  getIdentity(){
    return this.oauthSv.getIdentityClaims();
  }

  async saveUserRole() {
    const identity: any = this.getIdentity();
    if (!identity) return;

    const sub = identity['sub'];       // UID del usuario
    const email = identity['email'];

    const userRef = doc(db, 'roles', sub);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      // Solo crea el rol si no existía
      await setDoc(userRef, {
        email,
        roles: ['default'],
        details: identity
      });

      console.log('✅ Rol default asignado en Firestore');
    } else {
      console.log('ℹ️ Usuario ya tiene rol asignado');
    }
  }

  async getUserRole(): Promise<string[] | null> {
    const identity: any = this.getIdentity();
    if (!identity) return null;

    const sub = identity['sub'];
    const userRef = doc(db, 'roles', sub);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data: any = docSnap.data();
      const roles: string[] = data.roles || (data.role ? [data.role] : []);
      if (roles.length > 0) {
        console.log('🎯 Rol(es) del usuario:', roles);
        return roles;
      } else {
        console.warn('⚠️ El usuario no tiene roles asignados.');
        return null;
      }

    } else {
      console.warn('⚠️ El usuario no tiene un rol asignado.');
      return null;
    }
  }
}