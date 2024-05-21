import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../data-models/user';
import { CustomValidatorsService } from '../services/custom-validators.service';
import { CommunicatorService } from '../services/communicator.service';
import { ModalService } from '../services/modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PathsService } from '../services/paths.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  genders=["Male","Female","Others"];
  flag=false;

  constructor(public user:User,private builder:FormBuilder,
                private custom:CustomValidatorsService,
                private comm:CommunicatorService,
                private modal:ModalService,
                private router:Router,
                private paths:PathsService
                ){}

  details=this.builder.group({
    name:this.builder.group({
      fname:["",[Validators.required,Validators.pattern(/[A-Za-z]{2,}/)]],
      lname:["",[Validators.required,Validators.pattern(/[a-zA-Z]{2,}/)]],
    }),
    gender:[""],
    dob:["",[Validators.required,this.custom.dateerror]],
    email:["",Validators.email],
    uname:[""],
    pword:["",Validators.required],
    cword:["",Validators.required]
  },
  {
    validators:this.custom.mismatch
  })
  get name(){
    return this.details.get("name");
  }
  get fname(){
    return this.name?.get("fname");
  }
  get lname(){
    return this.name?.get("lname");
  }
  get gender(){
    return this.details.get("gender");
  }
  get dob(){
    return this.details.get("dob");
  }
  get email(){
    return this.details.get("email");
  }
  get uname(){
    return this.details.get("uname");
  }
  get pword(){
    return this.details.get("pword");
  }
  get cword(){
    return this.details.get("cword");
  }

  pvisible=false;
  ptype="password";
  ptoggle(){
    if(this.pvisible===false){
      this.pvisible=true;
      this.ptype="text";
    }
    else{
      this.pvisible=false;
      this.ptype="password";
    }
  }
  cvisible=false;
  ctype="password";
  ctoggle(){
    if(this.cvisible===false){
      this.cvisible=true;
      this.ctype="text";
    }
    else{
      this.cvisible=false;
      this.ctype="password";
    }
  }

  disabled=false;
  submit(){
    let message="Click 'ok' to confirm.\nElse 'cancel' and continue to edit.";
      this.modal.access(this.regresponse.bind(this));
      this.modal.popupon("Confirm:",[message],false,true,true);
  }
  nosubmit(){
    let message="Please fill the compulsory fields(* marked).";
    this.modal.popupon("Alert!",[message]);
  }
  register(){
    this.setuname();
    this.setuser();
    this.comm.usernamecheck(this.user.username!).subscribe({next:(value)=>{
      this.uname?.setValue(this.uname.value+value.serial.toString());
      this.user.username=this.uname?.value!;
        
      this.disabled=true;
  
      this.comm.register(this.user).subscribe({next:(value)=>{
          let msg=["Please note down the username.",
                "Username has first 2 letters of your first and last name,",
                "last 2 digits of birth year and a unique number consecutively",
                "Username will be required to login.",
                "Please Login to use our expense tracker service."];
                this.modal.access(this.redirect.bind(this));
                this.modal.popupon(value.message+" :",msg,false,true,false);
        },
        error:(err:HttpErrorResponse)=>{
          let msg;
          if(msg=err.error.message){}
          else
            msg=err.message;
          this.modal.popupon(err.statusText+"!",["Could not be registered: ",msg," You may retry."],true);
          this.disabled=false;
        }
      });
      
    }
    ,error:(err:HttpErrorResponse)=>{
      let msg;
      if(msg=err.error.message){}
      else
        msg=err.message;
      this.modal.popupon(err.statusText+"!",["Error generating username: ",msg," You may retry."],true);
      this.disabled=false;
    }});
  }
  setuname(){
    let f=this.fname?.value!;
    let n=this.lname?.value!;
    let d=this.dob?.value!;
    this.uname?.setValue(f.toLowerCase().slice(0,2)+
                          n.toLowerCase().slice(0,2)!+
                          d.slice(2,4));
  }
  setuser(){
    this.user.fullname=this.fname?.value+" "+this.lname?.value;
    this.user.gender=this.gender?.value;
    this.user.dob=this.dob?.value;
    this.user.email=this.email?.value;
    this.user.username=this.uname?.value!;
    this.user.password=this.pword?.value!;
  }

  regresponse(id:string){
    if(id==="cancel")
      this.disabled=false;
    else
      this.register();
  }
  redirect(id:string){
    this.user.fullname=null;
    this.user.gender=null;
    this.user.dob=null;
    this.user.email=null;
    this.user.username="";
    this.user.password="";
    this.router.navigate([this.paths.login()]);
  }
}
