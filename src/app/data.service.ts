 import{ Injectable } from '@angular/core';
 import { Observable } from 'rxjs/Observable'

 import {Posts} from './data.model';
 import { HttpClient} from '@angular/common/http';
 import 'rxjs/add/operator/catch';
 import 'rxjs/add/operator/do';
 @Injectable()
  
   
   export class DataService{
    private baseUrl = "https://vast-shore-74260.herokuapp.com/banks?";
   
  
     constructor(private _http: HttpClient) {
       console.log('Bank http service called');
     }
  
 
  
  
     public getBankBranches(city:any): Observable<Posts[]> {
       let myResponse = this._http.get<Posts[]>(this.baseUrl+"city="+city.toUpperCase());

      console.log(myResponse);
       return myResponse;
     };
  }   
  
  



