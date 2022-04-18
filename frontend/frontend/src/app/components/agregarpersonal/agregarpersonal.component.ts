import { Component, OnInit } from '@angular/core';
import { ListarpersonalService } from '../../services/listarpersonal.service';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agregarpersonal',
  templateUrl: './agregarpersonal.component.html',
  styleUrls: ['./agregarpersonal.component.css']
})
export class AgregarpersonalComponent implements OnInit {
  personalForm:  FormGroup;
  private URL = environment.apiURL
  estado?:boolean;
  personal = {
    id: '',
    nombre: '',
    cargo: '',
    correo: ''

  };


  constructor(private listarpersonalService: ListarpersonalService,
     private router: Router,
     public authService: AuthService,
     private http: HttpClient,
     private fb: FormBuilder) {

      this.personalForm = this.fb.group({
        nombre: ['',Validators.required],
        cargo: ['',Validators.required],
        correo: ['',Validators.required]  
      });


      }

  ngOnInit()  {

    this.http.get<any>(this.URL + '/isAdmin')
      .subscribe(
        res => {
          console.log(res.status);
        },
        err => {
          if (err.status === 403){
            console.log('ERROR 403')
            this.estado = false
            this.router.navigate(['/login'])

          }else {
            if (err.status === 401){
              console.log('ERROR 401')
              this.router.navigate(['/userview'])
            }
          }
          this.estado = true
        }
      );
  }

  agregarPersonal() {
    this.listarpersonalService.agregarPersonal(this.personal)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log(err)
      )
    this.router.navigate(['/listar'])
    //window.location.reload()
    //window.location.href = "/listar"
  }
}
