import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient, private _Router:Router) { 
    this.userDta()
  }
  user:BehaviorSubject<any>= new BehaviorSubject(null)
 register(userData:object):Observable<any>{
  return this._HttpClient.post(environment.baseUrl+'signup', userData)
 }
 login(userData:object):Observable<any>{
  return this._HttpClient.post(environment.baseUrl+'signin', userData)
 }

 userDta():void{
  const token =localStorage.getItem("userToken")
  if(token!==null){
    const userData= jwtDecode(token)
    this.user.next(userData)
    this._Router.navigate(['/home'])
  }
  
 }
}
