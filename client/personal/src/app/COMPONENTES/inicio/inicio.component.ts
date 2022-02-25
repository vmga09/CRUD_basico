import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/app/SERVICE/personal.service';
import { Router } from '@angular/router'
import { Personal } from 'src/app/MODELS/personal/personal.module';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  ListarPersonal?: any;
  personalActual: Personal = {};
  currentUser: Personal = {};
  currentIndex= -1;

  constructor(private PersonalService:PersonalService, private Router:Router) { }

  ngOnInit(): void {
    this.listarPersonal();
  }
  
  listarPersonal()
  {
    this.PersonalService.getPersonal().subscribe(
      res=>{
        console.log(res);
        this.ListarPersonal=<any>res;
      },
      err => console.log(err)
    );
  }
  
  refreshList(): void{
    window.location.reload();
    this.currentUser = {};
    this.currentIndex = -1;
  }


  eliminarPersonal(id:any): void{
    this.PersonalService.eliminarPersonal(id).subscribe(
      res=>{
        this.refreshList();
      },
      err=>{
        console.log(err);
      }


    );
  }


  modificarPersonal(id:any){
    this.Router.navigate(['/edit/:id'])
    /*  //this.PersonalService.modificarPersonal(id).subscribe(
    this.PersonalService.modificarPersonal(id, personal).subscribe(
      res=>{
        this.refreshList();
      },
      err=>{
        console.log(err);
      }


    ); */ 
  }
  

}
