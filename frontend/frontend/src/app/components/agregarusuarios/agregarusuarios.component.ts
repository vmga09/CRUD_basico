import { Component, OnInit } from '@angular/core';
import { ListarpersonalService } from '../../services/listarpersonal.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-agregarusuarios',
  templateUrl: './agregarusuarios.component.html',
  styleUrls: ['./agregarusuarios.component.css']
})
export class AgregarusuariosComponent implements OnInit {
  usuarioForm:  FormGroup;
  private URL = environment.apiURL

  usuario = {
    username: '',
    email: '',
    password: '',
    role_id: '',

  };

  constructor(private listarpersonalService: ListarpersonalService,
    private router: Router,
    public authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder,
    private toast: NgToastService) { 

      this.usuarioForm = this.fb.group({
        username: ['',Validators.required],
        email: ['',Validators.required],
        password: ['',Validators.required],
        role_id: ['',Validators.required]   
      });


    }

  ngOnInit(): void {

    this.http.get<any>(this.URL + '/isAdmin')
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

  }

  agregarUsuario() {

    this.listarpersonalService.agregarUsuario(this.usuario)
      .subscribe(
        res => {


          console.log(res)
        },
        err => {
          if (err.status === 200) {
            this.toast.success({
              detail: "Exito",
              summary: "Usuario agregado correctamente",
              duration: 3000,
              position: 'br'
            })

          } else {
            this.toast.error({
              detail: "Errot",
              summary: "Usuario ya existe en la base de datos",
              duration: 3000,
              position: 'br'
            })
          }
          console.log(err)
        }
      )


    this.router.navigate(['/listar'])
  }
}
