import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListarpersonalService {

  //private URL = 'http://172.17.0.4:3000'
  //private URL = 'http://localhost:3000'
  private URL = environment.apiURL

  constructor(private http: HttpClient) { }

  listarpersonal(){
    return this.http.get<any>(this.URL + '/mostrarpersonal');

  }

  getPersonalId(id:any) 
  { 
    return this.http.get(this.URL+`/listarPersonalId/${id}`);
  }

  eliminarPersonal(id:any)
  { 
    return this.http.get(this.URL+`/eliminarPersonal/${id}`);
    //return this.http.get(`${URL}/eliminarPersonal/${id}`);
  }

  agregarPersonal(personal:any)
  { 
    return this.http.post<any>(this.URL+'/agregarpersonal', personal);
  }

   modificarPersonal(id:any,personal:any)
  { 
    return this.http.put<any>(this.URL+`/modificarpersonal/${id}`, personal);
    //return this.http.put(this.URL+`/modificarPersonal`, personal);
  }

  agregarUsuario(usuario:any)
  { 
    return this.http.post<any>(this.URL+'/finduser', usuario);
  }


 
}
