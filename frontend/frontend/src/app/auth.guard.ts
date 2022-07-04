import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
     private authService: AuthService,
     private router:Router

  ){


  }

  canActivate(): boolean {
    //route: ActivatedRouteSnapshot
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
      if (this.authService.loggedIn()){
          if(this.authService.isadmin()) {
              console.log('EXITO')
              return true;
            }else 
            {
              console.log('USER')
              this.router.navigate(['/userview'])
              return false;
            }
      }

      this.router.navigate(['/'])
      return false;
  
  }


  
  
}
