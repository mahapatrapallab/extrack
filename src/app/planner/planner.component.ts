import { Component, ViewChild } from '@angular/core';
import { DisplayComponent } from '../display/display.component';
import { Entry } from '../data-models/entry';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [DisplayComponent,CommonModule,FormsModule],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.css'
})
export class PlannerComponent {

  type=["One-time bulk","Monthly","Yearly","Miscellaneous-small","Miscellaneous-regular","Miscellaneous-large"];
  netin=0;
  netout=0;
  result=0;

  constructor(private modal:ModalService){}

  entryin=new Entry;
  entryout=new Entry;
  
  @ViewChild("displayp") display!:DisplayComponent;
  submit(form:FormGroup){
    if(form.contains("indt")){
      this.display.setentry("in",this.entryin);
      this.netin += this.entryin.amount!;
      this.update();
      this.entryin=new Entry;
    }
    else{
      this.display.setentry("out",this.entryout);
      this.netout += this.entryout.amount!;
      this.update();
      this.entryout=new Entry;
    }
    form.markAsPristine();
    form.markAsUntouched();
  }
  nosubmit(form:FormGroup){
    let msg;
    if(form.contains("indt"))
      msg="Please fill up the compulsory(* marked) inflow details and in proper format";
    else
      msg="Please fill up the compulsory(* marked) outflow details and in proper format";
      this.modal.popupon("Alert!",[msg]);
  }

  update(){
    
    this.result = this.netin-this.netout;
  }
  
  inmod(ar:[Entry,string]){
    if(ar[1]=="edit"){
      this.entryin=ar[0];
    }
    this.netin -= ar[0].amount!;
    this.update();
  }
  outmod(ar:[Entry,string]){
    if(ar[1]=="edit"){
      this.entryout=ar[0];
    }
    this.netout -= ar[0].amount!;
    this.update();
  }
}
