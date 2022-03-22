import { Component, OnInit } from '@angular/core';
import { ListarpersonalService } from '../../services/listarpersonal.service';

@Component({
  selector: 'app-listarpersonal',
  templateUrl: './listarpersonal.component.html',
  styleUrls: ['./listarpersonal.component.css']
})
export class ListarpersonalComponent implements OnInit {

  constructor( private listarpersonalService:ListarpersonalService) { }

  ngOnInit() {
    this.listarpersonalService.listarpersonal()
    .subscribe(
      res => {
        console.log(res)
        //this.listarpersonalService

      },
      err => console.log(err) 
    )

  }

}
