import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   
   
  estado?: boolean;
   
  //private URL = 'http://172.17.0.4:3000'
  private URL = 'http://localhost:3000'

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
          console.log(this.estado)
          }else{
          this.estado = false
          console.log(this.estado)
          }
      }
      
      );

      
  }
  


  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.router.navigate(['/login'])


  }
}
