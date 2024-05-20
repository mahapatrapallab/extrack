import { Injectable } from '@angular/core';
import { routes } from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class PathsService {

  constructor() { }

  home(){
    let path="";
    for(let r of routes){
      if(r.component?.name==="_HomeComponent")
        path=r.path!;
    }
    return path;
  }
  planner(){
    let path="";
    for(let r of routes){
      if(r.component?.name==="_PlannerComponent")
        path=r.path!;
    }
    return path;  
  }
  tracker(){
    let path="";
    for(let r of routes){
      if(r.component?.name==="_TrackerComponent")
        path=r.path!;
    }
    return path;  
  }
  login(){
    let path="";
    for(let r of routes){
      if(r.component?.name==="_LoginComponent")
        path=r.path!;
    }
    return path;  
  }
  register(){
    let path="";
    for(let r of routes){
      if(r.component?.name==="_RegisterComponent")
        path=r.path!;
    }
    return path;  
  }
  logout(){
    let path="";
    for(let r of routes){
      if(r.component?.name==="_LogoutComponent")
        path=r.path!;
    }
    return path;  
  }

}
