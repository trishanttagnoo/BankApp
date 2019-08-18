import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';


@Component({
   selector: 'app-new',
   templateUrl: './bankDetail.html',
  
})

export class BankDetailComponent implements OnInit {
   public ifsc;
   public city;
   public bank_details;
   constructor(private _Activatedroute:ActivatedRoute,public data:DataService) {
      console.log('Home component constructor is called');
      }
      ngOnInit() 
      {
         this.ifsc=this._Activatedroute.snapshot.paramMap.get("bank_id");
         this.city=this._Activatedroute.snapshot.paramMap.get("city");

         this.data.getBankBranches(this.city).subscribe(
            data=>{
               
            
                  console.log('logging data');
         
                 this.bank_details=data.filter(f=>f.ifsc===this.ifsc)[0];
           
   
             },
            error=>{
                console.log('Some error occured');
              console.log(error.errorMessage);
             }
           )
         document.getElementById('main').style.display="none";
         console.log('Bank component onIniti called');
       }
    }
