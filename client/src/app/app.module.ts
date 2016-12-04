import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TabsModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DclWrapper } from './dcl-wrapper/dcl-wrapper.component';
import { SeriesComponent } from './series/series.component';
import { SeasonComponent } from './season/season.component';
import { EpisodeComponent } from './episode/episode.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { OrderBy } from './pipes/orderBy.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DclWrapper,
    SeasonComponent,
    SeriesComponent,
    OrderBy,
    EpisodeComponent,
    NavbarComponent,
    EditFormComponent,
  ],
  entryComponents: [SeasonComponent, EpisodeComponent],
  imports: [
    BrowserModule,
    HttpModule,
    ModalModule,
    TabsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
