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
import { ReactiveFormsModule } from '@angular/forms';
import { ThemePageComponent } from './theme-page/theme-page.component';
import { PrivacyPolicyComponent } from './footer-pages/privacy-policy/privacy-policy.component';
import { reducer } from 'src/state/groupsearch.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GroupSearchEffects } from 'src/state/groupsearch.effects';
import { GroupSearchService } from './group-search/group-search.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GroupSearchComponent,
    HomePageComponent,
    SharePageComponent,
    ThemePageComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ groupSearch: reducer}),
    EffectsModule.forRoot([GroupSearchEffects]),
    extModules
  ],
  providers: [GroupSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
