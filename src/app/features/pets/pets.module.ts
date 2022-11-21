import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { PetsFormComponent } from './pets-form/pets-form.component';
import { PetsRoutingModule } from './pets-routing.module';
import { PetsComponent } from './pets.component';

@NgModule({
  declarations: [PetsComponent, PetsFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    PetsRoutingModule,
    ReactiveFormsModule
  ]
})
export class PetsModule { }
