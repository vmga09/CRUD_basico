import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://172.17.0.4:3000'

  constructor(private http: HttpClient) { }

  login(usuario:any) {
     return this.http.post<any>(this.URL + '/login',usuario);

  }

  loggedIn(){
    return !!localStorage.getItem('token');

  }

}
