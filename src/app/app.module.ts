import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap/popover';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule,  MAT_DATE_LOCALE} from '@angular/material/core';
import { DateStatusPipe } from './pipe/date-status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DateStatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    PopoverModule.forRoot(),
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // Configura o locale para pt-BR
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
