import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  mismatch(details:AbstractControl):{[k:string]:any}|null{
    let pword=details.get("pword");
    let cword=details.get("cword");

    return (pword?.value !== cword?.value) && (pword?.dirty && cword?.dirty)?
              {"mismatch":true} :
              null;
  }

  dateerror(date:AbstractControl):{[k:string]:any}|null{
    let dob=new Date(date.value); 
    let cdate=new Date(); 
    
    return (dob>cdate)? {'dateerror':true} : null;
  }
}
