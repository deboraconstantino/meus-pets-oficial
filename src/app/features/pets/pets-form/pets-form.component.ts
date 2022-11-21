import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoComboOption, PoDialogService, PoNotificationService, PoPageEditLiterals } from '@po-ui/ng-components';
import { map, Subscription } from 'rxjs';
import { OwnerForm } from '../../owners/shared/interfaces/owner-form.interface';
import { Owner } from '../../owners/shared/interfaces/owner.interface';
import { PetForm } from '../shared/interfaces/pet-form.interface';
import { OwnersService } from './../../owners/shared/services/owners.service';
import { Pet } from './../shared/interfaces/pet.interface';
import { PetsService } from './../shared/services/pets.service';

@Component({
  selector: 'app-pets-form',
  templateUrl: './pets-form.component.html'
})
export class PetsFormComponent implements OnInit {
  petForm: FormGroup;
  petSubscription: Subscription;
  isLoading = false;
  disableSubmit = false;
  operation = 'post';
  title: string;
  ownerId: string;
  ownerForm: FormGroup;
  ownerNameOptions: Array<PoComboOption>;
  ownersSubscription: Subscription;
  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Pets', link: '/pets' },
      { label: 'Novo registro' }
    ]
  };
  customLiterals: PoPageEditLiterals = {
    saveNew: 'Salvar e Novo'
  };

  constructor(
    private petsService: PetsService,
    private poNotificationService: PoNotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private poDialogService: PoDialogService,
    private ownersService: OwnersService
  ) { }

  ngOnInit(): void {
    this.ownerId = this.activatedRoute.snapshot.params['ownerId'];
    this.setOperation();
    this.setTitle();
    this.createPetForm();
    this.createOwnerForm();
    this.getOwnerNameOptions();
  }

  setTitle(): void {
    if (this.operation === 'post') {
      this.title = 'Novo registro';
    } else {
      this.title = 'Alterar registro';
      this.customLiterals.saveNew = 'Excluir';
    }
    this.breadcrumb.items[2].label = this.title;
  }

  setOperation(): void {
    this.activatedRoute.snapshot.params['id'] ? this.operation = 'put' : this.operation = 'post';
  }

  cancel(): void {
    this.router.navigate(['pets']);
  }

  getOwnerNameOptions(): void {
    this.ownersSubscription = this.ownersService.get(1, 9999).pipe(
      map(owners => owners.items.map(owner => ({
        value: owner.id,
        label: owner.name
      })))
    ).subscribe(owners => this.ownerNameOptions = owners);
  }

  getOwnerInformations(id: string): void {
    this.ownersSubscription = this.ownersService.getById(id).subscribe(
      owner => {
        this.setOwnerInfoToOwnerForm(owner);
        this.setOwnerInfoToPetForm(owner);
      }
    );
  }

  setOwnerInfoToPetForm(owner: Owner): void {
    this.petForm.patchValue({
      ownerid: owner.id
    });
  }

  setOwnerInfoToOwnerForm(owner: Owner): void {
    this.ownerForm.patchValue({
      name: owner.id,
      email: owner.email,
      rg: owner.rg,
      cpf: owner.cpf,
      tel1: owner.tel1,
      tel2: owner.tel2
    });
  }

  createPetForm(): void {
    if (this.operation === 'post') {
      this.petForm = new FormGroup<PetForm>({
        id: new FormControl('', { nonNullable: true }),
        name: new FormControl('', { nonNullable: true }),
        breed: new FormControl('', { nonNullable: true }),
        color: new FormControl('', { nonNullable: true }),
        specie: new FormControl('', { nonNullable: true }),
        sexo: new FormControl('', { nonNullable: true }),
        ownerid: new FormControl('', { nonNullable: true })
      });
    } else {
      this.getPet();
    }
  }

  getPet(): void {
    this.isLoading = true;
    this.petsService.getById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (pet: Pet) => { this.onSuccessGet(pet); this.getOwnerInformations(pet.ownerid); },
      error: (error: any) => this.onErrorGet(error)
    });
  }

  onErrorGet(error: any): void {
    this.isLoading = false;
    this.poNotificationService.error(error.error.errorMessage);
  }

  onSuccessGet(pet: Pet): void {
    this.petForm = new FormGroup<PetForm>({
      id: new FormControl(pet.id, { nonNullable: true }),
      name: new FormControl(pet.name, { nonNullable: true }),
      color: new FormControl(pet.color, { nonNullable: true }),
      breed: new FormControl(pet.breed, { nonNullable: true }),
      specie: new FormControl(pet.specie, { nonNullable: true }),
      sexo: new FormControl(pet.sexo, { nonNullable: true }),
      ownerid: new FormControl(pet.ownerid, { nonNullable: true })
    });
    this.isLoading = false;
  }

  save(saveAndNew: boolean): void {
    this.isLoading = true;
    this.disableSubmit = true;
    this.petSubscription = this.petsService.post(this.petForm.value).subscribe({
      next: response => this.onSuccessSave(response, saveAndNew),
      error: error => this.onErrorSave(error)
    });
  }

  saveOrDelete(): void {
    if (this.operation === 'post') {
      this.save(true);
    } else {
      this.confirmDelete();
    }
  }

  confirmDelete(): void {
    this.poDialogService.confirm({
      title: 'Excluir pet',
      message: 'Tem certeza que deseja exluir?',
      confirm: this.delete.bind(this)
    })
  }

  delete(): void {
    this.isLoading = true;
    this.disableSubmit = true;
    this.petSubscription = this.petsService.delete(this.activatedRoute.snapshot.params['id']).subscribe({
      next: () => this.onSuccessDelete(),
      error: (error: any) => this.onErrorDelete(error)
    })
  }

  onSuccessDelete(): void {
    this.router.navigate(['pets']);
    this.poNotificationService.success('Registro excluído com sucesso.');
  }

  onErrorDelete(error: any): void {
    this.isLoading = false;
    this.disableSubmit = false;
    this.poNotificationService.error(error.error.errorMessage);
  }

  onSuccessSave(response: any, saveAndNew: boolean): void {
    this.isLoading = false;
    this.disableSubmit = false;
    this.poNotificationService.success(`Registro inserido com sucesso: ${response.id}`);
    saveAndNew ? this.petForm.reset() : this.router.navigate(['pets']);
    this.petSubscription.unsubscribe();
  }

  onErrorSave(error: any): void {
    this.isLoading = false;
    this.disableSubmit = false;
    this.poNotificationService.error(error.error.errorMessage);
    this.petSubscription.unsubscribe();
  }

  createOwnerForm(): void {
    this.ownerForm = new FormGroup<OwnerForm>({
      id: new FormControl('', { nonNullable: true }),
      name: new FormControl('', { nonNullable: true }),
      rg: new FormControl('', { nonNullable: true }),
      cpf: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true }),
      tel1: new FormControl('', { nonNullable: true }),
      tel2: new FormControl('', { nonNullable: true })
    });

    if (this.ownerId) {
      this.getOwnerInformations(this.ownerId);
    }
  }
}
