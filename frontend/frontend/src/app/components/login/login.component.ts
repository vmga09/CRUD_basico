import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {
    username:'',
    password:''
  }

  constructor(private authService: AuthService, private router:Router ) {  }

  ngOnInit(): void {
  }



  login(){
    this.authService.login(this.usuario)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token',res.token);
        localStorage.setItem('role',res.role);
        this.router.navigate(['/listar']);
      },
      err => console.log(err)
      )
  }
}
