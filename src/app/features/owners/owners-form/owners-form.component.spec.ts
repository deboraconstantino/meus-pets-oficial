import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersFormComponent } from './owners-form.component';

describe('OwnersFormComponent', () => {
  let component: OwnersFormComponent;
  let fixture: ComponentFixture<OwnersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnersFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
