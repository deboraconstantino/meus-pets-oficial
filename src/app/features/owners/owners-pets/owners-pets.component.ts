import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoInfoOrientation } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { Pet } from './../../pets/shared/interfaces/pet.interface';
import { Pets } from './../../pets/shared/interfaces/pets.interface';
import { PetsService } from './../../pets/shared/services/pets.service';

@Component({
  selector: 'app-owners-pets',
  templateUrl: './owners-pets.component.html'
})
export class OwnersPetsComponent implements OnInit {
  pets$: Observable<Pets>;
  title: string;
  ownerId: string;
  breadcrumb: PoBreadcrumb;
  orientation = PoInfoOrientation;

  constructor(
    private petsService: PetsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ownerId = this.activatedRoute.snapshot.params['id'];
    this.getPets();
    this.setTitle();
    this.setBreadcrumb();
  }

  goToPetView(pet: Pet): void {
    this.router.navigate(['pets/edit', pet.id])
  }

  getPets(): void {
    this.pets$ = this.petsService.get(1, 10, `ownerid eq ${this.ownerId}`);
  }

  setTitle(): void {
    this.title = `Pets do tutor ${this.ownerId}`;
  }

  setBreadcrumb(): void {
    this.breadcrumb = {
      items: [
        { label: 'Home', link: '/' },
        { label: 'Tutores', link: '/owners' },
        { label: this.title}
      ]
    };
  }
}
