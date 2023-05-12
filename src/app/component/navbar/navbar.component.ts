import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuName:string="Login"
  constructor(private _Router:Router,private _AuthService:AuthService){
    this._Router.events.subscribe({
      next:(response)=>{
        if(response instanceof NavigationEnd){
          this.menuName = response.url.replace("/",'');
        }
        
      }
    })
  }
  logOut(){
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login'])

  }
  isLogged(){
    if(localStorage.getItem('userToken')){
      return true;
    }
    else{
      return false;
    }
  }

}
