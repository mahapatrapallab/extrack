import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../data-models/user';
import { Entry } from '../data-models/entry';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  constructor(private http:HttpClient){}

  baseuser ="http://localhost:3200/Extrack/User";
  baseentry = "http://localhost:3200/Extrack/Entry";

  login(user:User){
    return this.http.post<{token:string}>(this.baseuser+"/login",user);
  }

  usernamecheck(username:string){
    return this.http.get<{serial:number}>(this.baseuser+"/usernamecheck/"+username);
  }
  register(user:User){
    return this.http.post<{message:string,affectedrows:number}>(this.baseuser+"/register",user);
  }
  logout(){
    return this.http.delete<{message:string}>(this.baseuser+"/logout");
  }

  getinrecords(){
    return this.http.get<Entry[]>(this.baseentry+"/loadall/in");
  }
  getoutrecords(){
    return this.http.get<Entry[]>(this.baseentry+"/loadall/out");
  }
  postinentry(entry:Entry){
    return this.http.post<Entry>(this.baseentry+"/save/in",entry);
  }
  postoutentry(entry:Entry){
    return this.http.post<Entry>(this.baseentry+"/save/out",entry);
  }
  deleteinentry(entry:Entry){
    return this.http.delete<{message:string,affectedrows:number}>(this.baseentry+"/delete/in",{body:entry});
  }
  deleteoutentry(entry:Entry){
    return this.http.delete<{message:string,affectedrows:number}>(this.baseentry+"/delete/out",{body:entry});
  }
}
