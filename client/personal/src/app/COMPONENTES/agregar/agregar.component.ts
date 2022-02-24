import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/app/SERVICE/personal.service';
import { Router } from '@angular/router'
import { Personal } from 'src/app/MODELS/personal/personal.module';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  personal: Personal={
    id:'',
    nombre:'',
    cargo:'',
    correo:''

  };
  
  constructor(private PersonalService:PersonalService, private router:Router ) { }

  ngOnInit(): void {
  }
  
  agregarPersonal(){
    delete this.personal.id;
    this.PersonalService.agregarPersonal(this.personal).subscribe();
    this.router.navigate(['/inicio']);
  }

}
