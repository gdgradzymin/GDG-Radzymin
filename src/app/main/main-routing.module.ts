import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from '../events/containers/events/events.component';
import { TeamComponent } from '../team/containers/team/team.component';
import { HomeComponent } from '../home/containers/home/home.component';
import { BlogComponent } from '../blog/containers/blog/blog.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  { path: '**',  redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
