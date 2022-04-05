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
  //personalForm:  FormGroup;
  private URL = environment.apiURL

  personal = {
    id: '',
    nombre: '',
    cargo: '',
    correo: ''

  };


  constructor(private listarpersonalService: ListarpersonalService,
     private router: Router,
     public authService: AuthService,
     private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get<any>(this.URL + '/isAdmin')
      .subscribe(
        res => {
          console.log(res.status);
        },
        err => {
          if (err.status !== 200) {
            this.router.navigate(['/userview'])
          }
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
  }
}
