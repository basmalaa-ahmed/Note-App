import { inject } from '@angular/core/';
import { ActivatedRouteSnapshot,CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const auth:CanActivateFn =(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): 
  Observable<boolean | UrlTree> 
  | Promise<boolean | UrlTree> 
  | boolean 
  | UrlTree => {

const _Auth= inject(AuthService)
const _Router= inject(Router)
if(_Auth.user.getValue()!== null){
  return true;
}
else{
  _Router.navigate(['/login'])
  return false
}

 

  
 
}

