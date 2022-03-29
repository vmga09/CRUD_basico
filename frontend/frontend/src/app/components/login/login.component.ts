import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  usuarioForm:  FormGroup;
  usuario = {
    username:'',
    password:''
  }
  mensaje?:any;
  incorrecta?: boolean;

  constructor(private authService: AuthService, private router:Router, private fb: FormBuilder ) {

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
        console.log(res);
        localStorage.setItem('token',res.token);
        localStorage.setItem('role',res.roleHash);
        this.router.navigate(['/listar']);
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
