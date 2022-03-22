import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ListarpersonalService {

  private URL = 'http://172.17.0.4:3000'

  constructor(private http: HttpClient) { }

  listarpersonal(){
    return this.http.get<any>(this.URL + '/mostrarpersonal');

  }
}
