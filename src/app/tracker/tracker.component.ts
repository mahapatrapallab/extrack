import { Component, ViewChild } from '@angular/core';
import { DisplayComponent } from '../display/display.component';
import { Entry } from '../data-models/entry';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { CommunicatorService } from '../services/communicator.service';
import { ModalService } from '../services/modal.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [DisplayComponent,CommonModule,FormsModule],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent {

  type=["One-time bulk","Monthly","Yearly","Miscellaneous-small","Miscellaneous-regular","Miscellaneous-large"];
  perpg=[10,20,30,40,50];

  netin=0;
  netout=0;
  result=0;

  inpgtl:number[]=[];
  inn=10;
  inactive=0;

  outpgtl:number[]=[];
  outn=10;
  outactive=0;

  toint(str:string){
    return parseInt(str);
  }
  
  constructor(private comm:CommunicatorService,
    private modal:ModalService
  ){}

  entryin=new Entry;
  entryout=new Entry;

  inrecords:Entry[]=[];
  intrue=false;

  outrecords:Entry[]=[];
  outtrue=false;

  @ViewChild("displayt") display!:DisplayComponent;
  submit(form:FormGroup){
    if(form.contains("indt")){
      this.comm.postinentry(this.entryin).subscribe({next:(value)=>{
        this.entryin.id=value.id;
        if(this.intrue===true){
          this.inrecords.push(this.entryin);
          this.inrecords.sort(this.display.comparator);
        }
  
        this.display.setentry("in",this.entryin);
        this.netin += this.entryin.amount!;
        this.update();
        this.entryin=new Entry;
      },
      error:(err:HttpErrorResponse)=>{
        this.display.setentry("in");
        this.entryin=new Entry;
        let msg;
          if(msg=err.error.message){}
          else
            msg=err.message;
        this.modal.popupon(err.statusText+"!",["Entry not saved :",msg],true);
      }
    });
    }

    else{
      this.comm.postoutentry(this.entryout).subscribe({next:(value)=>{
        this.entryout.id=value.id;
        if(this.outtrue===true){
          this.outrecords.push(this.entryout);
          this.outrecords.sort(this.display.comparator);
        }
  
        this.display.setentry("out",this.entryout);
        this.netout += this.entryout.amount!;
        this.update();
        this.entryout=new Entry;
      },
      error:(err:HttpErrorResponse)=>{
        this.display.setentry("out");
        this.entryout=new Entry;
        let msg;
          if(msg=err.error.message){}
          else
            msg=err.message;
        this.modal.popupon(err.statusText+"!",["Entry not saved :",msg],true);
      }
    });  
    }
    form.markAsPristine();
    form.markAsUntouched();
  }
  nosubmit(form:FormGroup){
    if(form.contains("indt")){
      let message="Please fill up the compulsory(* marked) inflow details and in proper format";
      this.modal.popupon("Alert!",[message]);
    }
    else{
      let message="Please fill up the compulsory(* marked) outflow details and in proper format";
      this.modal.popupon("Alert!",[message]);
    }
  }

  loadrecords(id:string){
    if(id==="in"){
      this.comm.getinrecords().subscribe({next:(value)=>{
        this.inrecords=value;
        if(this.inrecords.length>0){
          this.intrue=true;
          this.netin=0;
          this.inrecords.forEach((v)=>this.netin += v.amount!);
          this.update();
          this.pagination(id);
        }
      },
      error:(err:HttpErrorResponse)=>{
        let msg;
          if(msg=err.error.message){}
          else
            msg=err.message;
        this.modal.popupon(err.statusText+"!",["Error loading records: ",msg],true);
      }
    });
    }
    
    if(id==="out"){
      this.comm.getoutrecords().subscribe({next:(value)=>{
        this.outrecords=value;
        if(this.outrecords.length>0){
          this.outtrue=true;
          this.netout=0
          this.outrecords.forEach((v)=>this.netout +=v.amount!);
          this.update();
          this.pagination(id);
        }
      },
      error:(err:HttpErrorResponse)=>{
        let msg;
          if(msg=err.error.message){}
          else
            msg=err.message;
        this.modal.popupon(err.statusText+"!",["Error loading records: ",msg],true);
      }
    });
    }
  }
  pagination(id:string){
    if(id==="in"){
      let tl=this.inrecords.length;
      let inpgtl = Math.ceil(tl/this.inn);
      this.inpgtl=[];
      this.totalpg(this.inpgtl,inpgtl);
      this.intrue=true
      this.setrecords(id,1);
    }
    if(id==="out"){
      let tl=this.outrecords.length;
      let outpgtl = Math.ceil(tl/this.outn);
      this.outpgtl=[];
      this.totalpg(this.outpgtl,outpgtl);
      this.outtrue=true;
      this.setrecords(id,1);
     }
  }
  totalpg(ar:number[],tl:number){
    for(let i=1;i<=tl;i++)
      ar.push(i);
  }
  setrecords(id:string,pgno:number){
    if(id==="in"){
      let l=(pgno-1)*this.inn;
      let u=(pgno*this.inn);
      u=(u <= this.inrecords.length)? u:this.inrecords.length;
      this.display.showrecords(this.inrecords.slice(l,u),id);
      this.inactive=pgno;
    }
    if(id==="out"){
      let l=(pgno-1)*this.outn;
      let u=(pgno*this.outn);
      u=(u <= this.outrecords.length)? u:this.outrecords.length;
      this.display.showrecords(this.outrecords.slice(l,u),id);
      this.outactive=pgno;
    }
  }

  update(){
    this.result = this.netin-this.netout;
  }
  
  ediletein(ar:[Entry,string]){
    if(ar[1]=="edit"){
      this.entryin=ar[0];  
    }
    
    this.comm.deleteinentry(ar[0]).subscribe({next:(value)=>{
        console.log(value);
      },
      error:(err:HttpErrorResponse)=>{
        let msg;
          if(msg=err.error.message){}
          else
            msg=err.message;
        this.modal.popupon(err.statusText+"!",["Entry not deleted: ",msg],true);
      }
    });
    
    this.netin -=ar[0].amount!;
      this.update();
      this.inrecords.forEach((r:Entry,i:number,inrecords)=>{
        if(r.id===ar[0].id)
          inrecords.splice(i,1);
      });
  }
  edileteout(ar:[Entry,string]){
    if(ar[1]=="edit"){
      this.entryout=ar[0];
    }
    
    this.comm.deleteoutentry(ar[0]).subscribe({next:(value)=>{
        console.log(value);
      },
      error:(err:HttpErrorResponse)=>{
        let msg;
          if(msg=err.error.message){}
          else
            msg=err.message;
        this.modal.popupon(err.statusText+"!",["Entry not deleted: ",msg],true);
      }
    });

      this.netout -=ar[0].amount!;
      this.update();
      this.outrecords.forEach((r:Entry,i:number,outrecords)=>{
        if(r.id===ar[0].id)
          outrecords.splice(i,1);
      });
  }
}
