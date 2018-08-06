import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule,
    FontAwesomeModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule,
    PageHeaderComponent,
    FontAwesomeModule,
    FooterComponent,
    RouterModule
  ],
  declarations: [ PageHeaderComponent, FooterComponent ]
})
export class SharedModule { }
