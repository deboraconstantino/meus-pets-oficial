import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsFormComponent } from './pets-form.component';

describe('PetsFormComponent', () => {
  let component: PetsFormComponent;
  let fixture: ComponentFixture<PetsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
