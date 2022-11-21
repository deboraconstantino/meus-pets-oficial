import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersPetsComponent } from './owners-pets.component';

describe('OwnersPetsComponent', () => {
  let component: OwnersPetsComponent;
  let fixture: ComponentFixture<OwnersPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnersPetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnersPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
