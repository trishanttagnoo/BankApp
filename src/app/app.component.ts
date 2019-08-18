import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { bindCallback } from 'rxjs';
import { filter } from 'minimatch';


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   providers:[DataService],
   styleUrls: ['./app.component.css']
  
})
 export class AppComponent implements OnInit {
  public searchString: string=""; 
  public city: string="MUMBAI"; 
   public nativeBranch;
   public globalData;
   public limit=10;
   public c=1;
   public filteredGlobalData;

   constructor(public data: DataService) {
   console.log('Home component constructor is called');
   }
 

   getCityData(event:any){
      this.c=1;
      console.log(event.target.value);
      this.city=event.target.value;
      var s=this.searchString;
      let filteredData
      this.data.getBankBranches(this.city).subscribe(
         data=>{
               console.log('logging data');
               
            console.log(data);
            this.globalData = data;
            console.log(s);
            if(this.searchString!==''){
               filteredData=data.filter(f=>f.ifsc.toLowerCase().includes(this.searchString.toLowerCase())||f.bank_id.toString().toLowerCase().includes(this.searchString.toLowerCase())||f.branch.toLowerCase().includes(this.searchString.toLowerCase())||f.address.toLowerCase().includes(this.searchString.toLowerCase())||f.city.toLowerCase().includes(this.searchString.toLowerCase())||f.district.toLowerCase().includes(this.searchString.toLowerCase())||f.state.toLowerCase().includes(this.searchString.toLowerCase()));
               this.filteredGlobalData=filteredData;
               this.nativeBranch=this.globalData.slice(0,this.limit);
      if(filteredData.length>this.limit*this.c)
      {
   document.getElementById("viewMore").style.display='block';
      }
      else{
         document.getElementById("viewMore").style.display='none';
      }
               filteredData=filteredData.slice(0,this.limit*this.c);
            } else{
               filteredData=data;
               this.filteredGlobalData=filteredData;
               if(filteredData.length>this.limit*this.c)
      {
   document.getElementById("viewMore").style.display='block';
      }
      else{
         document.getElementById("viewMore").style.display='none';
      }
               filteredData=filteredData.slice(0,this.limit*this.c);

            }
           
            if(filteredData.length==0){
              filteredData=[{ifsc:"No data found"}];//object
             }
             
            this.nativeBranch = filteredData;
          
            //  ||f.bank_id.toString().toLowerCase()===this.searchString.toLowerCase()||f.branch===this.searchString||f.address===this.searchString||f.city===this.searchString||f.district===this.searchString||f.state===this.searchString);
             console.log(this.nativeBranch);
          },
         error=>{
             console.log('Some error occured');
           console.log(error.errorMessage);
          }
        )

   

  
        
   }
   getLimitData(event:any)
   {
      this.c=1;
      this.limit = parseInt(event.target.value);
      let allData;
      this.nativeBranch=this.globalData.slice(0,this.limit);
      if(this.globalData.length>this.limit*this.c)
      {
   document.getElementById("viewMore").style.display='block';
      }
      else{
         document.getElementById("viewMore").style.display='none';
      }
     

   }
   nextRecords(event:any){
      let allData;
      this.c+=1;
      if(this.searchString!=='')
      {

         this.nativeBranch=this.filteredGlobalData.slice(0,this.limit*this.c);
         if(this.filteredGlobalData.length>this.limit*this.c)
         {
      document.getElementById("viewMore").style.display='block';
         }
         else{
            document.getElementById("viewMore").style.display='none';
         }
      }
      else
      {
         this.nativeBranch=this.globalData.slice(0,this.limit*this.c);
         if(this.globalData.length>this.limit*this.c)
         {
      document.getElementById("viewMore").style.display='block';
         }
         else{
            document.getElementById("viewMore").style.display='none';
         }
      }
  }
  filterData(event:any){
      let filteredData;

      console.log(event.target.value);
    
      this.searchString=event.target.value;
      filteredData=this.globalData.filter(f=>f.ifsc.toLowerCase().includes(this.searchString.toLowerCase())||f.bank_id.toString().toLowerCase().includes(this.searchString.toLowerCase())||f.branch.toLowerCase().includes(this.searchString.toLowerCase())||f.address.toLowerCase().includes(this.searchString.toLowerCase())||f.city.toLowerCase().includes(this.searchString.toLowerCase())||f.district.toLowerCase().includes(this.searchString.toLowerCase())||f.state.toLowerCase().includes(this.searchString.toLowerCase()));
      if(filteredData.length>this.limit*this.c)
      {
     document.getElementById("viewMore").style.display='block';
      }
      else{
         document.getElementById("viewMore").style.display='none';
      }
      this.nativeBranch = filteredData.slice(0,this.limit*this.c);
      
      this.filteredGlobalData=filteredData;

   }

   bankData(){
      let allData;
      this.data.getBankBranches(this.city).subscribe(
         data=>{
            this.globalData = data;
         
               console.log('logging data');
            console.log(data);
            console.log(this.searchString);
           data.forEach(element => {
               let val = localStorage.getItem(element.ifsc);
               if(val==null){
                  element.fav="NO";
               }else{
                  element.fav=val;
               }
                
             });
       
             this.nativeBranch = data.slice(0,this.limit);

             
             console.log(this.nativeBranch);

          },
         error=>{
             console.log('Some error occured');
           console.log(error.errorMessage);
          }
        )
  
   }

   setFavourite(event:any,ifsc:any)
   {
      console.log(ifsc);
      
      if(localStorage.getItem(ifsc)==null){
         
         localStorage.setItem(ifsc, 'YES');
      }
      else{
         localStorage.removeItem(ifsc);
      }
      this.nativeBranch.forEach(element => {
        let val = localStorage.getItem(element.ifsc);
        if(val==null){
           element.fav="NO";
        }else{
           element.fav=val;
        }
         
      });

   }


  ngOnInit() 
  {
   document.getElementById('main').style.display="block";

     console.log('App component onIniti called');
  
    this.bankData();
   }
}



     