//ESTE ARCHIVO DEBERA AGREGARSE AL GITIGNORE, YA QUE TENDREMOS UNO PARA CADA AMBIENTE DONDE HABRA UN CLIENTID Y UN CLIENTSECRET PARA CADA UNO
//LO MISMO SUCEDE CON LA REDIRECTURI, VA A VARIAR DEPENDIENDO DEL AMBIENTE

import { AuthConfig } from 'angular-oauth2-oidc';

  export const authCodeFlowConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: 'https://accounts.google.com',

    // URL of the SPA to redirect the user to after login
    redirectUri: 'https://birthstones-frontend-login.vercel.app/home',

    // The SPA's id. The SPA is registerd with this id at the auth-server
    // clientId: 'server.code',
    clientId: '332005279061-fibdidl8qj4838vv370pt5s1ospt12j6.apps.googleusercontent.com',

    strictDiscoveryDocumentValidation: false,

    // Just needed if your auth server demands a secret. In general, this
    // is a sign that the auth server is not configured with SPAs in mind
    // and it might not enforce further best practices vital for security
    // such applications.
    // dummyClientSecret: 'secret',

    responseType: 'code',

    dummyClientSecret:'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',

    // set the scope for the permissions the client should request
    // The first four are defined by OIDC.
    // Important: Request offline_access to get a refresh token
    // The api scope is a usecase specific one
    scope: 'openid profile email',

    showDebugInformation: true,
  };