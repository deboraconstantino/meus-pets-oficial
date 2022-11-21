import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'index.html', pathMatch: 'full' },
  { path: 'index.html', component: HomeComponent },
  { path: 'owners', loadChildren: () => import('./features/owners/owners.module').then(m => m.OwnersModule) },
  { path: 'pets', loadChildren: () => import('./features/pets/pets.module').then(m => m.PetsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
