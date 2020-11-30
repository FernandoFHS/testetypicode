import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPasswordTransactionComponent } from './recover-password-transaction.component';

describe('RecoverPasswordTransactionComponent', () => {
  let component: RecoverPasswordTransactionComponent;
  let fixture: ComponentFixture<RecoverPasswordTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverPasswordTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPasswordTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
