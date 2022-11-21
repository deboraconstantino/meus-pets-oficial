import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsFormComponent } from './pets-form/pets-form.component';
import { PetsComponent } from './pets.component';

const routes: Routes = [
  { path: '', component: PetsComponent },
  { path: 'new', component: PetsFormComponent },
  { path: 'edit/:id', component: PetsFormComponent },
  { path: 'new/:ownerId', component: PetsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
