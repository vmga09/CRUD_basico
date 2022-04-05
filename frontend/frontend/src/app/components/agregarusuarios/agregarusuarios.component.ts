import { Component, OnInit } from '@angular/core';
import { ListarpersonalService } from '../../services/listarpersonal.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agregarusuarios',
  templateUrl: './agregarusuarios.component.html',
  styleUrls: ['./agregarusuarios.component.css']
})
export class AgregarusuariosComponent implements OnInit {

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

  agregarUsuario() {

    this.listarpersonalService.agregarUsuario(this.usuario)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log(err)
      )
    this.router.navigate(['/listar'])
  }
}
