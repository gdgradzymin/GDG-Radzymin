import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule,
  ],
  declarations: []
})
export class SharedModule { }
