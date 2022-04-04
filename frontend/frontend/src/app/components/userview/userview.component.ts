import { Component, OnInit } from '@angular/core';
import { ListarpersonalService } from '../../services/listarpersonal.service';
import { Router } from '@angular/router'
import { HttpClient  } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  personals:any = [];
  

  constructor( private listarpersonalService:ListarpersonalService , private Router:Router, private http: HttpClient, public authService: AuthService  ) { }

  ngOnInit(): void {
    
    this.listarpersonalService.listarpersonal()
    .subscribe(
      res => {
        console.log(res)
        this.personals = <any>res
        console.log(this.personals)

      },
      err => console.log(err) 
    )



  }

}
