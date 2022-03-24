import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ListarpersonalService {

  private URL = 'http://172.17.0.4:3000'

  constructor(private http: HttpClient) { }

  listarpersonal(){
    return this.http.get<any>(this.URL + '/mostrarpersonal');

  }

  getPersonalId(id:any) 
  { 
    return this.http.get(URL+`/listarPersonalId/${id}`);
  }

  eliminarPersonal(id:any)
  { 
    return this.http.get(URL+`/eliminarPersonal/${id}`);
  }

  agregarPersonal(personal:any)
  { 
    return this.http.post<any>(this.URL+'/agregarpersonal', personal);
  }

   modificarPersonal(id:any,personal:any)
  { 
    return this.http.put(URL+`/modificarPersonal/${id}`, personal);
  }


}
