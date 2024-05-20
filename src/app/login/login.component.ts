import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../data-models/user';
import { PathsService } from '../services/paths.service';
import { Router } from '@angular/router';
import { CommunicatorService } from '../services/communicator.service';
import { ModalService } from '../services/modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenHandlerService } from '../services/token-handler.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  constructor(public user:User,
                private paths:PathsService,
                private router:Router,
                private comm:CommunicatorService,
                private modal:ModalService,
                private jwthandler:TokenHandlerService
              ){}
  
  nosubmit(){
    let message="Please fill out all credentials properly.";
    this.modal.popupon("Alert!",[message]);
  }
  submit(){
    
    this.comm.login(this.user).subscribe({next:(val)=>{
      console.log(jwtDecode(val.token));
      this.jwthandler.settoken(val.token);
      this.router.navigate([this.paths.tracker()]);
    },
    error:(err:HttpErrorResponse)=>{
      let msg;
          if(msg=err.error.message){}
          else
            msg=err.message;
      this.modal.popupon(err.statusText+"!",["Could not login :",msg,"You may retry"],true);
    }
  });
  }

  visible=false;
  inputtype="password";
  toggle(){
    if(this.visible===false){
      this.visible=true;
      this.inputtype="text";
    }
    else{
      this.visible=false;
      this.inputtype="password";
    }
  }

}
