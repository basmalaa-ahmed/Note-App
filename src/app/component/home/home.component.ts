import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import NoteDataComponent from '../note-data/note-data.component';
import { NoteService } from 'src/app/core/services/note.service';
import { AuthService } from 'src/app/core/services/auth.service';
import jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(public dialog: MatDialog,private _NoteService:NoteService,private _AuthService:AuthService){}
  value = '';
  
  notes:any[]=[];
  ngOnInit(): void {
    this.getNotes()
  }
  openDialog() {
    const dialogRef = this.dialog.open(NoteDataComponent);

    dialogRef.afterClosed().subscribe( 
      {next:(response)=>{
        if(response==='add'){
          this.getNotes();
        }
      }
      
    });
  }
  getNotes():void{    
    const modal={
      token:localStorage.getItem('userToken'),
      userID:this._AuthService.user.getValue()._id
    };
    console.log(modal)
    this._NoteService.getNotes(modal).subscribe({
    next:(response)=>{
     if(response.message==='success'){
      this.notes=response.Notes


     }
     console.log(response)
},
    });
  }
 
  setData(note:object):void{
    const dialogRef= this.dialog.open(NoteDataComponent,
      {data:{note}});
      dialogRef.afterClosed().subscribe({
        next:(response)=>{
          console.log(response)
          if(response==='updated'){
            this.getNotes()
          }
        }
      })
  }


  deleteItem(id:string,index:number):void{
    const modal={
      NoteID:id,
      token:localStorage.getItem('userToken')

    }
    this._NoteService.deleteNotes(modal).subscribe({
      next:(response)=>{
        console.log(response)
        if(response.message==='deleted'){
          this.notes.splice(index,1);
          this.notes=[...this.notes];
          

        }
    }
    })
    
   
  }
}
