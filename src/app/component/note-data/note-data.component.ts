import { formatDate } from '@angular/common';
import { Component ,Inject,OnInit} from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.css']
})
export default class NoteDataComponent implements OnInit {
  constructor(private _fb:FormBuilder,
     private _note:NoteService,
     private _MatDialogRef:MatDialogRef<NoteDataComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any
    ){}
  userData:any
  oldData: any = {};
  dataForm !:FormGroup
ngOnInit():void{
  this.creatForm()
  this.userData = jwtDecode(localStorage.getItem("userToken")!)
  console.log(this.data)

}

creatForm(){
  this.dataForm=this._fb.group({
    title:[this.data? this.data.note.title:'',[Validators.required]],
    desc:[this.data? this.data.note.desc:'',[Validators.required]],
    token:localStorage.getItem('userToken')
  })
}
sendData():void{
  if(this.dataForm.valid){
   console.log(this.dataForm.value)
   if(this.data===null){
    this.addData()
   }
   else{
      this.updateNote();
   }
  }
 

}
updateNote():void{
  const modal={
    ...this.dataForm.value,
    NoteID:this.data.note._id,
    token:localStorage.getItem('userToken'),
  }
  this._note.updateData(modal).subscribe({
    next:(response)=>{
      console.log(response)
      if(response.message==='updated'){
        this._MatDialogRef.close('updated')
      }
    }
  })
}
// updateNote(): void {
//   const newData: string = JSON.stringify(this.dataForm.value);
//   if (this.oldData !== newData) {
//     this._note.updateData({ ...this.dataForm.value, NoteID: this.data.noteData._id })
//       .subscribe({
//         next: (response) => {
//           console.log(response)
//           if (response.message === 'updated') {
//             // this.dataForm.reset();
//             this._MatDialogRef.close('updated');
//           }
//         },
//       });
//   } else {
//     this._MatDialogRef.close();
//   }
// }
addData():void{
  const modal={...this.dataForm.value,
    citizenID:this.userData._id}
  
this._note.addData(modal).subscribe({
  next:(response)=>{
    if(response.message==='success'){
      this._MatDialogRef.close('add')

    }
  }
})
}
}
