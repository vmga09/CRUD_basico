import { Component, OnInit } from '@angular/core';
import { ListarpersonalService } from '../../services/listarpersonal.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-listarpersonal',
  templateUrl: './listarpersonal.component.html',
  styleUrls: ['./listarpersonal.component.css']
})
export class ListarpersonalComponent implements OnInit {

  personals:any = [];
  
  
  constructor( private listarpersonalService:ListarpersonalService , private Router:Router) { }

  ngOnInit()   {
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
