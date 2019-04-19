import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventsComponent } from "../events/containers/events/events.component";
import { TeamComponent } from "../team/containers/team/team.component";
import { HomeComponent } from "../home/home.component";
import { BlogComponent } from "../blog/containers/blog/blog.component";
import { BlogPostComponent } from "../blog/containers/blog-post/blog-post.component";
import { DevFestComponent } from "../devfest/containers/devfest/devfest.component";
import { MetatagsResolver } from "../services/metatags-reslover.service";
import { BlogPostResolver } from "../services/blog-post-resolver.service";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent, resolve: {metatags: MetatagsResolver}
  },
  {
    path: "home",
    component: HomeComponent, resolve: {metatags: MetatagsResolver}
  },
  {
    path: "events",
    component: EventsComponent, resolve: {metatags: MetatagsResolver}
  },
  {
    path: "team",
    component: TeamComponent, resolve: {metatags: MetatagsResolver}
  },
  {
    path: "blog",
    component: BlogComponent, resolve: {metatags: MetatagsResolver}
  },
  {
    path: "blog/:postLink",
    component: BlogPostComponent, resolve: {blogPost: BlogPostResolver}
  },
  {
    path: "devfest",
    component: DevFestComponent, resolve: {metatags: MetatagsResolver}
  },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
