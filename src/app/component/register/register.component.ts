import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private _FormBuilder:FormBuilder,private _AuthService:AuthService,private _Router:Router,
    private toastr: ToastrService ){}
  ngOnInit(): void {
    this.creatForm()
  }
hide=true;
  registerForm!:FormGroup
  creatForm():void{
    this.registerForm= this._FormBuilder.group({
      first_name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email,Validators.pattern(/.com$/)]],
      password:['',[Validators.required]],
      age:['',[Validators.required,Validators.max(99),Validators.min(15)]],
    })
  }
  register(userData:FormGroup):void{

    if(userData.valid){
      this._AuthService.register(userData.value).subscribe({
        next:(response)=>{
          if(response.message==='success'){
            this._Router.navigate(['/login'])
          }
          else{
            this.toastr.warning(response.message,'ERROR'              )
            console.log(response)
          }
        }
      })
    }
  }
}
