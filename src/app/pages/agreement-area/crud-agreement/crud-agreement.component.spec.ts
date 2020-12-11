import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAgreementComponent } from './crud-agreement.component';

describe('CrudAgreementComponent', () => {
  let component: CrudAgreementComponent;
  let fixture: ComponentFixture<CrudAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudAgreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
