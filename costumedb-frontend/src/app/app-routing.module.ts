import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupSearchComponent } from './group-search/group-search.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SharePageComponent } from './share-page/share-page.component';
import { ThemePageComponent } from './theme-page/theme-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'groupsearch', component: GroupSearchComponent },
  { path: 'share', component: SharePageComponent },
  { path: 'theme/:theme', component: ThemePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
