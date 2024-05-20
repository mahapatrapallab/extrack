import { Inject, Injectable, InjectionToken, inject } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export class User {
    id?:number|null=null;
    fullname?:string|null=null;
    gender?:string|null=null;
    dob?:string|null=null;
    email?:string|null=null;
    username?="";
    password?="";
}
