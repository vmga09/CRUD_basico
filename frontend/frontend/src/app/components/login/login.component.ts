import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient  } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  usuarioForm:  FormGroup;
  private URL = environment.apiURL
  usuario = {
    username:'',
    password:''
  }
  mensaje?:any;
  incorrecta?: boolean;

  constructor(private authService: AuthService, private router:Router, private fb: FormBuilder ,private http: HttpClient,private toast: NgToastService) {

    this.usuarioForm = this.fb.group({
      username1: ['',Validators.required],
      password1: ['',Validators.required]
    })

    }

  ngOnInit(): void {
  
    localStorage.removeItem('token')
  }

  login(): void{

    this.incorrecta = false;

    this.authService.login(this.usuario)
    .subscribe(
      res => {

        localStorage.setItem('token',res.token);
        //localStorage.setItem('role',res.roleHash);
        //localStorage.setItem('rid_ss0',res.rid_ss0);
        console.log(res.token)
 
        this.http.get<any>(this.URL + '/iseditoroadmin')
        .subscribe(
          res => {
            console.log('El resultado es'+res.status);
          },
          err => {
              if(err.status === 200){
                this.toast.success({
                  detail: "Bienvenido",
                  summary: "Ud esta autorizado",
                  duration: 3000,
                  position: 'br'
                 })
      
                this.router.navigate(['/listar']);
              
              }else{

                this.toast.info({
                  detail: "Bienvenido",
                  summary: "Ud solo puede visualizar",
                  duration: 3000,
                  position: 'br'
                 })

                this.router.navigate(['/userview']);
            
              }
          }
          
          );
        
      },
      (serverLoginError: any) => {
        console.log('error in subscribe err');
        console.log(serverLoginError.statusText, serverLoginError.status);
        if (serverLoginError.status != 200) {
          
          this.toast.error({
            summary: "intente nuevamente",
            detail: "Usuario o password incorrecto",
            duration: 3000,
            position: 'top'
           })

          //console.log('password incorrecta')
          //this.mensaje = ('uoyguygvu')
          //console.log(this.mensaje);
          //this.incorrecta = true;
          
          ////this.usuarioForm.controls['password'].setErrors({invalid: true});
        }}
      //err => console.log(err)
      )
  }
}
