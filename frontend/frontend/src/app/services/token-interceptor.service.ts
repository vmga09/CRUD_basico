import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  
  intercept(req:any,next:any){

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')
    const tokenHeader = req.clone({
      setHeaders: {
         Authorization: `Bearer ${token}`,
         RoleKey:`Bearer ${role}`
      }
    });
    return next.handle(tokenHeader)


 } constructor() { }
}
