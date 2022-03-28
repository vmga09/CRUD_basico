import { Component, OnInit } from '@angular/core';
import { ListarpersonalService } from '../../services/listarpersonal.service';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregarpersonal',
  templateUrl: './agregarpersonal.component.html',
  styleUrls: ['./agregarpersonal.component.css']
})
export class AgregarpersonalComponent implements OnInit {
  //personalForm:  FormGroup;
  
  
  personal = {
    id:'',
    nombre:'',
    cargo:'',
    correo:''

  };


  constructor(private listarpersonalService:ListarpersonalService , private router:Router ) {  }

  ngOnInit(): void {
  }

  agregarPersonal(){

    this.listarpersonalService.agregarPersonal(this.personal)
    .subscribe(
      res=>{
        console.log(res)
        
      },
      err => console.log(err)
     
    )
    this.router.navigate(['/listar'])


  }

}
