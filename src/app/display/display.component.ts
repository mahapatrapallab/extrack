import { Component, EventEmitter, Output } from '@angular/core';
import { Entry } from '../data-models/entry';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent {

  entryin:Entry[]=[];
  entryout:Entry[]=[];
  toDate(dt:string){
    return new Date(dt);
  }

  setentry(id:string,entry?:Entry){
    if(this.id===id)
      this.delete();
    if(!entry)
      return;

    if(id==="in"){
      this.entryin.push(entry!);
      this.entryin.sort(this.comparator);
    }
    if(id==="out"){
      this.entryout.push(entry!);
      this.entryout.sort(this.comparator);
    }
  }

  showrecords(records:Entry[],id:string){
    if(id==="in")
      this.entryin=records;
    if(id==="out")
      this.entryout=records;
  }

  k?:number;
  id?:string;
  
  @Output() inevent=new EventEmitter<[Entry,string]>();
  @Output() outevent=new EventEmitter<[Entry,string]>();

  edit(entry:Entry){
    if(this.id==="in")
      this.inevent.emit([entry,"edit"]);
    if(this.id==="out")
      this.outevent.emit([entry,"edit"]);
  }

  comparator(a:Entry,b:Entry){
    let adt = new Date(a.date!);
    let bdt = new Date(b.date!);
    if(adt>bdt)
      return -1;
    if(adt<bdt)
      return 1;
    return 0;
  }
    
  delete(entry?:Entry){
    if(this.id==="in"){
      if(entry)
        this.inevent.emit([entry,"delete"]);
      this.entryin.splice(this.k!,1);
    }
    if(this.id==="out"){
      if(entry)
        this.outevent.emit([entry,"delete"]);
      this.entryout.splice(this.k!,1);
    }
    this.k=undefined;
    this.id=undefined;
  }
}
