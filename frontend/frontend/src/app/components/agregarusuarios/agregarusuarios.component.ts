import { Component, OnInit } from '@angular/core';
import { ListarpersonalService } from '../../services/listarpersonal.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-agregarusuarios',
  templateUrl: './agregarusuarios.component.html',
  styleUrls: ['./agregarusuarios.component.css']
})
export class AgregarusuariosComponent implements OnInit {

  usuario = {
  username:'',
  email:'',
  password:'',
  role_id:'',

  };

  constructor(private listarpersonalService:ListarpersonalService , private router:Router) { }

  ngOnInit(): void {
  }

  agregarUsuario(){

    this.listarpersonalService.agregarUsuario(this.usuario)
    .subscribe(
      res=>{
        console.log(res)
        
      },
      err => console.log(err)
     
    )

    this.router.navigate(['/listar'])

  }

}
