import { Component, OnInit } from '@angular/core';
import { ListarpersonalService } from '../../services/listarpersonal.service';
import { Router } from '@angular/router';
import { HttpClient  } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-listarpersonal',
  templateUrl: './listarpersonal.component.html',
  styleUrls: ['./listarpersonal.component.css']
})
export class ListarpersonalComponent implements OnInit {

  personals:any = [];
  estado?:boolean;
  estado2?:boolean;
  //private URL = 'http://localhost:3000'
  private URL = environment.apiURL
  
  constructor( private listarpersonalService:ListarpersonalService , private Router:Router, private http: HttpClient, public authService: AuthService  ) { }

  ngOnInit()   {
    this.listarpersonalService.listarpersonal()
    .subscribe(
      res => {
        console.log(res)
        this.personals = <any>res
        console.log(this.personals)

      },
      err => console.log(err) 
    )
    
   
    //this.http.get<any>(this.URL + '/isAdmin')
    this.http.get<any>(this.URL + '/iseditoroadmin')
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

      this.http.get<any>(this.URL + '/isAdmin')
    .subscribe(
      res => {
        console.log(res.status);
      },
      err => {
          if(err.status == 200){
          this.estado2 = true
          console.log(this.estado)
          }else{
          this.estado2 = false
          console.log(this.estado)
          }
      }
      
      );
     

  }

  eliminarPersonal(id: any): void {
    console.log('Persona eliminada:', id)
    this.listarpersonalService.eliminarPersonal(id)
      .subscribe(
        response => {
          // this.refreshList();
          console.log(response)
        },
        err => {
          console.log(err)
        });
    alert("Usuario Eliminado")
    window.location.reload();
  }

  modificarPersonal(id:any){
    //editarPersonal(id:any){
    this.Router.navigate(['/editarpersonal/:id'])
    
  }
  
}
