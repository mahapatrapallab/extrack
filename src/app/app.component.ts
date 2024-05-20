import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PathsService } from './services/paths.service';
import { CommonModule } from '@angular/common';
import { ModalService } from './services/modal.service';
import { TokenHandlerService } from './services/token-handler.service';
import { CommunicatorService } from './services/communicator.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'extrack';

  constructor(private paths:PathsService,
              public modal:ModalService,
              public jwthandler:TokenHandlerService,
              private comm:CommunicatorService,
  ){}

  home=this.paths.home();
  planner=this.paths.planner();
  tracker=this.paths.tracker();
  login=this.paths.login();
  register=this.paths.register();

  logout(){
    this.comm.logout().subscribe({next:(val)=>{
      this.modal.popupon("Message :",[val.message]);
      this.jwthandler.settoken(undefined);
    },
    error:(err:HttpErrorResponse)=>{
      let msg;
      if(msg=err.error.message){}
      else
        msg=err.message;
      this.modal.popupon(err.statusText+"!",["Could not logout :",msg,"You may retry"],true);
    }
  });
  }

}
