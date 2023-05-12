import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _FormBuilder:FormBuilder,private _AuthService:AuthService,private _Router:Router,
    private toastr: ToastrService ){
      
    }
  ngOnInit(): void {
    this.creatForm()
  }
hide=true;
loginForm!:FormGroup
  creatForm():void{
    this.loginForm= this._FormBuilder.group({
      
      email:['',[Validators.required,Validators.email,Validators.pattern(/.com$/)]],
      password:['',[Validators.required]],
    })
  }
  login(userData:FormGroup):void{

    if(userData.valid){
      this._AuthService.login(userData.value).subscribe({
        next:(response)=>{
          if(response.message==='success'){
            localStorage.setItem("userToken", response.token)
            this._AuthService.userDta()
            this._Router.navigate(['/home'])
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
