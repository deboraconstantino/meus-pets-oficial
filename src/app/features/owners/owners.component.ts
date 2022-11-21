import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService, PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { Owner } from './shared/interfaces/owner.interface';
import { Owners } from './shared/interfaces/owners.interface';
import { OwnersService } from './shared/services/owners.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html'
})
export class OwnersComponent implements OnInit, OnDestroy {
  owners: Owners = {
    items: [],
    hasNext: false,
    remainingRecords: 0
  }
  columns: Array<PoTableColumn>;
  page = 1;
  pageSize = 10;
  isLoading = false;
  ownersSubscription: Subscription;
  totalOwners = 10;
  textRemainingRecords: string;
  hasNextPage = false;
  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Tutores' }
    ]
  };
  actions: Array<PoPageAction> = [
    { label: 'Novo', action: this.goToFormOwner.bind(this) }
  ];

  constructor(
    private ownersService: OwnersService,
    private poNotificationService: PoNotificationService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.ownersSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.setColumns();
    this.getOwners(1, 10);
  }

  setColumns(): void {
    this.columns = [
      { property: 'id', label: 'Código', type: 'link', action: (row: string) => this.goToView(row) },
      { property: 'name', label: 'Nome' },
      { property: 'rg', label: 'RG', visible: false },
      { property: 'cpf', label: 'CPF' },
      { property: 'email', label: 'E-mail' },
      { property: 'tel1', label: 'Telefone 1' },
      { property: 'tel2', label: 'Telefone 2', visible: false },
      { property: 'pets', label: 'Pets', type: 'icon', icons: [
        { value: 'view-pet', icon: 'po-icon-eye', action: (owner: Owner) => this.goToViewPets(owner.id), tooltip: 'Visualizar pets' },
        { value: 'include-pet', icon: 'po-icon-plus-circle', action: (owner: Owner) => this.goToPetForm(owner.id), tooltip: 'Incluir pets' }
      ] }
    ];
  }

  goToPetForm(id: string): void {
    this.router.navigate(['pets/new', id]);
  }

  goToViewPets(id: string): void {
    this.router.navigate(['owners/view-pets', id]);
  }

  getOwners(page: number, pageSize: number): void {
    this.isLoading = true;
    this.ownersSubscription = this.ownersService.get(page, pageSize).subscribe({
      next: (owners: Owners) => this.onSuccessOwners(owners),
      error: (error: any) => this.onErrorOwners(error)
    });
  }

  onSuccessOwners(owners: Owners): void {
    if (this.owners.items.length === 0) {
      this.owners = owners;
      this.owners.items = this.owners.items.map(owner => ({
        ...owner,
        pets: ['view-pet', 'include-pet']
      }));
    } else {
      this.owners.items = this.owners.items.concat(owners.items);
      this.owners.items = this.owners.items.map(owner => ({
        ...owner,
        pets: ['view-pet', 'include-pet']
      }));
    }

    this.hasNextPage = owners.hasNext;
    this.totalOwners = this.owners.items.length;
    this.textRemainingRecords = `Mostrando ${this.totalOwners} de ${this.totalOwners+owners.remainingRecords}`
    this.isLoading = false;
  }

  onErrorOwners(error: any): void {
    this.poNotificationService.error(error);
    this.isLoading = false;
  }

  showMore(): void {
    this.page += 1;
    this.getOwners(this.page, 10);
  }

  goToFormOwner(): void {
    this.router.navigate(['owners/new']);
  }

  goToView(id: string): void {
    this.router.navigate(['owners/edit', id]);
  }
}
