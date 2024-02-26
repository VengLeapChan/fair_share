import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReceiptPageComponent } from './single-receipt-page.component';

describe('SingleReceiptPageComponent', () => {
  let component: SingleReceiptPageComponent;
  let fixture: ComponentFixture<SingleReceiptPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleReceiptPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleReceiptPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
