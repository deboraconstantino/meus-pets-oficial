import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDialogService, PoNotificationService, PoPageEditLiterals } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { Owner } from '../shared/interfaces/owner.interface';
import { OwnerForm } from './../shared/interfaces/owner-form.interface';
import { OwnersService } from './../shared/services/owners.service';

@Component({
  selector: 'app-owners-form',
  templateUrl: './owners-form.component.html'
})
export class OwnersFormComponent implements OnInit {
  ownerForm: FormGroup;
  ownerSubscription: Subscription;
  isLoading = false;
  disableSubmit = false;
  operation = 'post';
  title: string;
  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Tutores', link: '/owners' },
      { label: 'Novo registro' }
    ]
  };
  customLiterals: PoPageEditLiterals = {
    saveNew: 'Salvar e Novo'
  };
  owner: Owner = {
    id: '',
    name: '',
    rg: '',
    cpf: '',
    email: '',
    tel1: '',
    tel2: ''
  };

  constructor(
    private ownersService: OwnersService,
    private poNotificationService: PoNotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private poDialogService: PoDialogService
  ) { }

  ngOnInit(): void {
    this.setOperation();
    this.setTitle();
    this.operation === 'post' ? this.createForm(this.owner) : this.getOwner();
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
    if (this.ownerSubscription) {
      this.ownerSubscription.unsubscribe();
    }
    
    this.router.navigate(['owners']);
  }

  createForm(owner: Owner): void {
    this.ownerForm = new FormGroup<OwnerForm>({
      id: new FormControl(owner.id, { nonNullable: true }),
      name: new FormControl(owner.name, { nonNullable: true }),
      rg: new FormControl(owner.rg, { nonNullable: true }),
      cpf: new FormControl(owner.cpf, { nonNullable: true }),
      email: new FormControl(owner.email, { nonNullable: true }),
      tel1: new FormControl(owner.tel1, { nonNullable: true }),
      tel2: new FormControl(owner.tel2, { nonNullable: true })
    });
  }

  getOwner(): void {
    this.isLoading = true;
    this.ownersService.getById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (owner: Owner) => this.onSuccessGet(owner),
      error: (error: any) => this.onErrorGet(error)
    });
  }

  onErrorGet(error: any): void {
    this.isLoading = false;
    this.poNotificationService.error('Falha ao retornar registro.');
  }

  onSuccessGet(owner: Owner): void {
    this.isLoading = false;
    this.owner = owner;
    this.createForm(owner);
  }

  save(saveAndNew: boolean): void {
    this.isLoading = true;
    this.disableSubmit = true;
    this.operation === 'post' ? this.post(saveAndNew) : this.put(saveAndNew);
  }

  post(saveAndNew: boolean): void {
    this.ownerSubscription = this.ownersService.post(this.ownerForm.value).subscribe({
      next: response => this.onSuccessSave(response, saveAndNew),
      error: error => this.onErrorSave(error)
    });
  }

  put(saveAndNew: boolean): void {
    this.ownerSubscription = this.ownersService.put(this.ownerForm.value).subscribe({
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
      title: 'Excluir tutor',
      message: 'Tem certeza que deseja exluir?',
      confirm: this.delete.bind(this)
    })
  }

  delete(): void {
    this.isLoading = true;
    this.disableSubmit = true;
    this.ownerSubscription = this.ownersService.delete(this.activatedRoute.snapshot.params['id']).subscribe({
      next: () => this.onSuccessDelete(),
      error: () => this.onErrorDelete()
    })
  }

  onSuccessDelete(): void {
    this.router.navigate(['owners']);
    this.poNotificationService.success('Registro excluído com sucesso.');
  }

  onErrorDelete(): void {
    this.isLoading = false;
    this.disableSubmit = false;
    this.poNotificationService.error('Falha ao excluir registro.');
  }

  onSuccessSave(response: any, saveAndNew: boolean): void {
    this.isLoading = false;
    this.disableSubmit = false;
    this.poNotificationService.success(`Registro inserido com sucesso: ${response.id}`);
    saveAndNew ? this.ownerForm.reset() : this.router.navigate(['owners']);
  }

  onErrorSave(error: any): void {
    this.isLoading = false;
    this.disableSubmit = false;
    this.poNotificationService.error('Falha ao salvar registro.');
  }
}
