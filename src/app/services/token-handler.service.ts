import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenHandlerService {

  private token?:string;
  constructor() { }

  gettoken(){
    return this.token;
  }

  settoken(token:string|undefined){
    this.token = token;
  }
}
