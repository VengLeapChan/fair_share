import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewReceiptPageComponent } from './create-new-receipt-page.component';

describe('CreateNewReceiptPageComponent', () => {
  let component: CreateNewReceiptPageComponent;
  let fixture: ComponentFixture<CreateNewReceiptPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewReceiptPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewReceiptPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
