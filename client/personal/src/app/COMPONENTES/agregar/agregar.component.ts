import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/app/SERVICE/personal.service';
import { Router } from '@angular/router'
import { Personal } from 'src/app/MODELS/personal/personal.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  personalForm:  FormGroup;
  personal: Personal={
    id:'',
    nombre:'',
    cargo:'',
    correo:''

  };
  
  constructor(private PersonalService:PersonalService, private router:Router, private fb: FormBuilder ) {
    this.personalForm = this.fb.group({
      nombre1: ['',Validators.required],
      cargo1: ['',Validators.required],
      correo1: ['',Validators.required],
    })
   }

  ngOnInit(): void {
  }
  
  agregarPersonal(){
    delete this.personal.id;
    console.log(this.personalForm);
    this.PersonalService.agregarPersonal(this.personal).subscribe();
    this.router.navigate(['/inicio']);
  }




}
