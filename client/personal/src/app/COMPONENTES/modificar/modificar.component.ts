import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/app/SERVICE/personal.service';
import { Router, ActivatedRoute } from '@angular/router'
import { Personal } from 'src/app/MODELS/personal/personal.module';
import { ThisReceiver } from '@angular/compiler';
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

  //id: any;
  constructor(private PersonalService:PersonalService,
              private router:Router,
              private activeRoute:ActivatedRoute) { } 

  ngOnInit(): void {
    const id_in = this.activeRoute.snapshot.paramMap.get('id');
    console.log('Id de entrada'+id_in);

    if(id_in){
      this.PersonalService.getPersonalId(id_in).subscribe(
        res=>{
          this.personal = res;
          console.log(res);
        },
        err=>console.log(err)
      );
    }

  }


  modificarPersonal()
    {

     this.PersonalService.modificarPersonal(this.personal.id,this.personal).subscribe(
       res=>{
         console.log(res);
       },
       err=>{
         console.log(err)
       }
     );

     this.router.navigate( ['/inicio']);


    }
}
