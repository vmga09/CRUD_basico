import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient  } from '@angular/common/http';
import {environment} from '../../../environments/environment';

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

  constructor(private authService: AuthService, private router:Router, private fb: FormBuilder ,private http: HttpClient) {

    this.usuarioForm = this.fb.group({
      username1: ['',Validators.required],
      password1: ['',Validators.required]
    })

    }

  ngOnInit(): void {


    
  }

  login(): void{

    this.incorrecta = false;

    this.authService.login(this.usuario)
    .subscribe(
      res => {

        localStorage.setItem('token',res.token);
        localStorage.setItem('role',res.roleHash);
        localStorage.setItem('rid_ss0',res.rid_ss0);
        console.log(res.token)
 
        this.http.get<any>(this.URL + '/iseditoroadmin')
        .subscribe(
          res => {
            console.log('El resultado es'+res.status);
          },
          err => {
              if(err.status === 200){
                this.router.navigate(['/listar']);
              
              }else{
                this.router.navigate(['/userview']);
            
              }
          }
          
          );
        
      },
      (serverLoginError: any) => {
        console.log('error in subscribe err');
        console.log(serverLoginError.statusText, serverLoginError.status);
        if (serverLoginError.status != 200) {
          console.log('password incorrecta')
          //this.mensaje = ('uoyguygvu')
          console.log(this.mensaje);
          this.incorrecta = true;
          
          ////this.usuarioForm.controls['password'].setErrors({invalid: true});
        }}
      //err => console.log(err)
      )
  }
}
