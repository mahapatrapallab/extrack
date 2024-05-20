import { Injectable } from '@angular/core';
import EventEmitter from 'events';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  popup=false;
  err=false;
  cvisible=false;
  header="";
  msg:string[]=[];
  response?=false;
  constructor() { }
  
  setok(){
    this.err=false;
    this.cvisible=false;
    this.popup=false;
    if(this.response===true)
      this.callback("ok");
    this.response=false;
  }
  setcancel(){
    this.err=false;
    this.cvisible=false;
    this.popup=false;
    if(this.response===true)
      this.callback("cancel");
    this.response=false;
  }
  popupon(hdr:string,msg:string[],err?:boolean,response?:boolean,cvisible?:boolean){
    if(err)
      this.err=err;
    if(cvisible)
      this.cvisible=cvisible;
    if(response)
      this.response=response;
    this.header=hdr;
    this.msg=msg;
    this.popup=true;
  }
  access(cb:(id:string)=>void){
    this.callback=cb;
  }
  callback(id:string){};

}
