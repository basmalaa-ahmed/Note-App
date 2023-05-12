import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient:HttpClient) { }
  addData(userData:object):Observable<any>{
   return this._HttpClient.post(environment.baseUrl+'addNote',userData)
  }
  updateData(userData:object):Observable<any>{
    return this._HttpClient.put(environment.baseUrl+'updateNote',userData)
   }
   getNotes(userData:object):Observable<any>{
    return this._HttpClient.post(environment.baseUrl+'getUserNotes',userData)
   }
   deleteNotes(userData:object):Observable<any>{
    const modal={
      body:userData

    }
    return this._HttpClient.delete(environment.baseUrl+'deleteNote',modal)
    
   }
}
