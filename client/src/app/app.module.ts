import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TabsModule, ModalModule, DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DclWrapper } from './dcl-wrapper/dcl-wrapper.component';
import { SeriesComponent } from './series/series.component';
import { SeasonComponent } from './season/season.component';
import { EpisodeComponent } from './episode/episode.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { OrderBy } from './pipes/orderBy.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { ModalComponent } from './modal/modal.component';
import { CreatorComponent } from './creator/creator.component';
import { DirectorComponent } from './director/director.component';
import { AwardComponent } from './award/award.component';
import { CompanyComponent } from './company/company.component';
import { ActorComponent } from './actor/actor.component';
import { ManagerComponent } from './manager/manager.component';

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
    FilterPipe,
    ModalComponent,
    CreatorComponent,
    DirectorComponent,
    AwardComponent,
    CompanyComponent,
    ActorComponent,
    ManagerComponent,
  ],
  entryComponents: [SeasonComponent, EpisodeComponent],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    //BS4
    ModalModule,
    TabsModule,
    DropdownModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
