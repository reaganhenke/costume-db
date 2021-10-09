import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { extModules } from 'src/environments';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GroupSearchComponent } from './group-search/group-search.component';
import { SharePageComponent } from './share-page/share-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemePageComponent } from './theme-page/theme-page.component';
import { PrivacyPolicyComponent } from './footer-pages/privacy-policy/privacy-policy.component';
import { reducer as groupSearchReducer } from 'src/state/group-search/group-search.reducer';
import { reducer as themeSearchReducer } from 'src/state/theme-search/theme-search.reducer';
import { reducer as textSearchReducer } from 'src/state/text-search/text-search.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GroupSearchEffects } from 'src/state/group-search/group-search.effects';
import { HttpClientModule } from '@angular/common/http';
import { CreditComponent } from './footer-pages/credit/credit.component';
import { FeedbackComponent } from './footer-pages/feedback/feedback.component';
import { TermsofuseComponent } from './footer-pages/termsofuse/termsofuse.component';
import { TextSearchEffects } from 'src/state/text-search/text-search.effects';
import { ThemeSearchEffects } from 'src/state/theme-search/theme-search.effects';
import { ResultsPageComponent } from './results-page/results-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GroupSearchComponent,
    SharePageComponent,
    ThemePageComponent,
    PrivacyPolicyComponent,
    CreditComponent,
    FeedbackComponent,
    TermsofuseComponent,
    ResultsPageComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      groupSearch: groupSearchReducer,
      themeSearch: themeSearchReducer,
      textSearch: textSearchReducer
    }),
    EffectsModule.forRoot([
      GroupSearchEffects,
      ThemeSearchEffects,
      TextSearchEffects
    ]),
    extModules,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
