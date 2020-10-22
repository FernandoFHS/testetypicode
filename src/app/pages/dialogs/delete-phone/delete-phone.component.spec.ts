import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePhoneComponent } from './delete-phone.component';

describe('DeletePhoneComponent', () => {
  let component: DeletePhoneComponent;
  let fixture: ComponentFixture<DeletePhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
