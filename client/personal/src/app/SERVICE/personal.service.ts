import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personal } from '../MODELS/personal/personal.module';
import { Observable } from 'rxjs';    

const URL = 'http://172.17.0.4:3000/api';



@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  [x: string]: any;
  constructor(private http:HttpClient) { }
  
  getPersonal(): Observable<any> 
  {
    
    return this.http.get<Personal[]>(URL+'/listarPersonal');
  }

  getPersonalId(id:any): Observable<any>
  { 
    return this.http.get(URL+`/listarPersonalId/${id}`);
  }
 
  eliminarPersonal(id:any): Observable<any>
  { 
    return this.http.get(URL+`/eliminarPersonal/${id}`);
  }

  agregarPersonal(personal:any):Observable<any>
  { 
    return this.http.post(URL+'/agregarPersonal', personal);
  }

   modificarPersonal(id:string,personal:any):Observable<any>
  { 
    return this.http.put(URL+`/modificarPersonal/${id}`, personal);
  }


 





}


