import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { OwnersFormComponent } from './owners-form/owners-form.component';
import { OwnersPetsComponent } from './owners-pets/owners-pets.component';
import { OwnersRoutingModule } from './owners-routing.module';
import { OwnersComponent } from './owners.component';

@NgModule({
  declarations: [OwnersComponent, OwnersFormComponent, OwnersPetsComponent],
  imports: [
    CommonModule,
    SharedModule,
    OwnersRoutingModule,
    ReactiveFormsModule
  ]
})
export class OwnersModule { }
