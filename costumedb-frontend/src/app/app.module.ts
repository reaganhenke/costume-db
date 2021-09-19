import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { extModules } from 'src/environments';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GroupSearchComponent } from './group-search/group-search.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SharePageComponent } from './share-page/share-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GroupSearchComponent,
    HomePageComponent,
    SharePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    extModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
