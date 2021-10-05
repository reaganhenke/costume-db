import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './footer-pages/credit/credit.component';
import { FeedbackComponent } from './footer-pages/feedback/feedback.component';
import { PrivacyPolicyComponent } from './footer-pages/privacy-policy/privacy-policy.component';
import { TermsofuseComponent } from './footer-pages/termsofuse/termsofuse.component';
import { GroupSearchComponent } from './group-search/group-search.component';
import { SharePageComponent } from './share-page/share-page.component';
import { ThemePageComponent } from './theme-page/theme-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'groupsearch'
  },
  { path: 'groupsearch', component: GroupSearchComponent },
  { path: 'share', component: SharePageComponent },
  { path: 'theme/:theme', component: ThemePageComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'credit', component: CreditComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'terms', component: TermsofuseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
