import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/app/SERVICE/personal.service';
import { Router } from '@angular/router'
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
  constructor() { }

  ngOnInit(): void {
  }

}
