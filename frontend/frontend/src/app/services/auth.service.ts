import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   
   
  estado?: boolean;
   
 
  private URL = environment.apiURL

  constructor(private http: HttpClient,
              private router:Router) { }

  login(usuario:any) {
     return this.http.post<any>(this.URL + '/login',usuario);

  }

  loggedIn(){
    return !!localStorage.getItem('token');

  }
 
  
  isadmin(){
    //this.estado = true
    return this.http.get<any>(this.URL + '/isAdmin')
    .subscribe(
      res => {
        console.log(res.status);
      },
      err => {
          if(err.status == 200){
          this.estado = true
          console.log('El estado es :'+this.estado)
          }else{
          this.estado = false
          console.log('el estado es :'+this.estado)
          }
      }
      
      );

      
  }
  
  

  logout(){
    
    this.http.get<any>(this.URL + '/logout')
    
    .subscribe(
      res => {
       // localStorage.removeItem('rid_ss0')
        console.log(res.status);
      },
      err => {
          
      }
      
      );

      


      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('rid_ss0')
       return this.router.navigate(['/login'])

  }
}
