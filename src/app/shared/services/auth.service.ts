import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenName: string = 'Lansanet-Auth-Token';

  constructor() { }

  setTokenAuth(tokenAuth: string): boolean {
    localStorage.setItem(this.tokenName, tokenAuth);
    return true;
  }
}
