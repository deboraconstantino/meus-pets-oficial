import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    PoModule,
    PoTemplatesModule
  ]
})
export class SharedModule { }
