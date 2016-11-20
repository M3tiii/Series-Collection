import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SeriesComponent } from './series/series.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    SeriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
