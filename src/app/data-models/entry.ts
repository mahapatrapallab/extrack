import { Injectable } from "@angular/core";


@Injectable({
    providedIn:"root"
})
export class Entry {
    id?:number|null=null;
    date?:string|null=null;
    amount?:number|null=0;
    details?:string|null=null;
    type?:string|null="";
}
