import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BankDetailComponent } from './bankDetail.component';

import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {DataService} from './data.service';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
 
  { path: 'bank/:city/:bank_id', component: BankDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,BankDetailComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
