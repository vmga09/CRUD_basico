import { Component, OnInit } from '@angular/core';
import { ListarpersonalService } from '../../services/listarpersonal.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-editarpersonal',
  templateUrl: './editarpersonal.component.html',
  styleUrls: ['./editarpersonal.component.css']
})
export class EditarpersonalComponent implements OnInit {

  private URL = environment.apiURL
  personal:any = {
    id:'',
    nombre:'',
    cargo:'',
    correo:''

  };

  constructor(private listarpersonalService:ListarpersonalService, 
    private router:Router, 
    private activeRoute:ActivatedRoute, 
    public authService: AuthService,
    private http:HttpClient) { 


   }

  ngOnInit(): void {

    this.http.get<any>(this.URL + '/iseditoroadmin')
      .subscribe(
        res => {
          console.log(res.status);
        },
        err => {
          if (err.status === 403){
            console.log('ERROR 403')
            //this.estado = false
            this.router.navigate(['/login'])

          }else {
            if (err.status === 401){
              console.log('ERROR 401')
              localStorage.removeItem('token')
              this.router.navigate(['/login'])
            }
          }
          //this.estado = true
        }
        
      );



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
