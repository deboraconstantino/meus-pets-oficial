import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnersFormComponent } from './owners-form/owners-form.component';
import { OwnersPetsComponent } from './owners-pets/owners-pets.component';
import { OwnersComponent } from './owners.component';
const routes: Routes = [
  { path: '', component: OwnersComponent },
  { path: 'new', component: OwnersFormComponent },
  { path: 'edit/:id', component: OwnersFormComponent },
  { path: 'view-pets/:id', component: OwnersPetsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnersRoutingModule { }
