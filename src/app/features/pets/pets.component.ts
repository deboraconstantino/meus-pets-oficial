import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoModalComponent, PoNotificationService, PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { Owner } from './../owners/shared/interfaces/owner.interface';
import { OwnersService } from './../owners/shared/services/owners.service';
import { Pets } from './shared/interfaces/pets.interface';
import { PetsService } from './shared/services/pets.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html'
})
export class PetsComponent implements OnInit, OnDestroy {
  @ViewChild(PoModalComponent, { static: true }) petOwner: PoModalComponent;
  pets: Pets = {
    items: [],
    hasNext: false,
    remainingRecords: 0
  }
  columns: Array<PoTableColumn>;
  page = 1;
  pageSize = 10;
  isLoading = false;
  petsSubscription: Subscription;
  totalPets = 10;
  textRemainingRecords: string;
  hasNextPage = false;
  owner: Owner;
  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Pet' }
    ]
  };
  actions: Array<PoPageAction> = [
    { label: 'Novo', action: this.goToFormPet.bind(this) }
  ];

  constructor(
    private petsService: PetsService,
    private poNotificationService: PoNotificationService,
    private router: Router,
    private ownersService: OwnersService
  ) {}

  ngOnDestroy(): void {
    this.petsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.setColumns();
    this.getPets(1, 10);
  }

  setColumns(): void {
    this.columns = [
      { property: 'sexo', label: 'Sexo', type: 'subtitle', subtitles: [
        { value: "F", color: 'color-06', label: 'Fêmea', content: '' },
        { value: "M", color: 'color-04', label: 'Macho', content: '' }
      ] },
      { property: 'id', label: 'Código', type: 'link', action: (row: string) => this.goToView(row) },
      { property: 'name', label: 'Nome' },
      { property: 'color', label: 'Cor' },
      { property: 'breed', label: 'Raça' },
      { property: 'specie', label: 'Espécie' },
      { property: 'ownerid', label: 'Tutor', type: 'link', action: (id: string) => this.viewOwner(id) }
    ];
  }

  viewOwner(id: string): void {
    this.isLoading = true
    this.ownersService.getById(id).subscribe({
      next: (owner: Owner) => { this.owner = owner; this.petOwner.open(); this.isLoading = false },
      error: (error: any) => { this.poNotificationService.error('Falha ao localizar tutor: ' + error); this.isLoading = false }
    });
  }

  getPets(page: number, pageSize: number): void {
    this.isLoading = true;
    this.petsSubscription = this.petsService.get(page, pageSize).subscribe({
      next: (pets: Pets) => this.onSuccessPets(pets),
      error: (error: any) => this.onErrorPets(error)
    });
  }

  onSuccessPets(pets: Pets): void {
    if (this.pets.items.length === 0) {
      this.pets = pets;
    } else {
      this.pets.items = this.pets.items.concat(pets.items);
    }

    this.hasNextPage = pets.hasNext;
    this.totalPets = this.pets.items.length;
    this.textRemainingRecords = `Mostrando ${this.totalPets} de ${this.totalPets+pets.remainingRecords}`
    this.isLoading = false;
  }

  onErrorPets(error: any): void {
    this.poNotificationService.error(error);
    this.isLoading = false;
  }

  showMore(): void {
    this.page += 1;
    this.getPets(this.page, 10);
  }

  goToFormPet(): void {
    this.router.navigate(['pets/new']);
  }

  goToView(id: string): void {
    this.router.navigate(['pets/edit', id]);
  }

  goToOwner(): void {
    this.router.navigate(['owners/edit', this.owner.id])
  }
}
