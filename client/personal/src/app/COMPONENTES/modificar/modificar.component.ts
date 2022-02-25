import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/app/SERVICE/personal.service';
import { Router, ActivatedRoute } from '@angular/router'
import { Personal } from 'src/app/MODELS/personal/personal.module';
@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {
  
  personal: Personal={
    id:'',
    nombre:'',
    cargo:'',
    correo:''

  };

  id: any;
  constructor(private PersonalService:PersonalService,
              private router:Router,
              private activeRoute:ActivatedRoute) { } 

  ngOnInit(): void {
    const id_in = this.activeRoute.snapshot.params[0];
    console.log('Id de entrada'+id_in);

  }


  modificarPersonal()
    {

    }
}
