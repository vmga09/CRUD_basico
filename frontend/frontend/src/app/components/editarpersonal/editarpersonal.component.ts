import { Component, OnInit } from '@angular/core';
import { ListarpersonalService } from '../../services/listarpersonal.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-editarpersonal',
  templateUrl: './editarpersonal.component.html',
  styleUrls: ['./editarpersonal.component.css']
})
export class EditarpersonalComponent implements OnInit {

  personal:any = {
    id:'',
    nombre:'',
    cargo:'',
    correo:''

  };

  constructor(private listarpersonalService:ListarpersonalService , private router:Router, private activeRoute:ActivatedRoute, public authService: AuthService) { 


   }

  ngOnInit(): void {

    const id_in = this.activeRoute.snapshot.paramMap.get('id');
    console.log('Id de entrada'+id_in);

    if(id_in){
      this.listarpersonalService.getPersonalId(id_in).subscribe(
        res=>{
          this.personal = res;
          console.log(res);
        },
        err=>console.log(err)
      );
    }

  }

  
  modificarPersonal() {
    this.listarpersonalService.modificarPersonal(this.personal.id, this.personal)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);

        });

    this.router.navigate(['/listar']);
    //window.location.href = "/listar";
  
  }



}
