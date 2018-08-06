import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './containers/blog/blog.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogPostComponent } from './containers/blog-post/blog-post.component';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    BlogComponent
  ],
  declarations: [BlogComponent, BlogCardComponent, BlogPostComponent, AuthorCardComponent, PhotoGalleryComponent]
})
export class BlogModule { }
