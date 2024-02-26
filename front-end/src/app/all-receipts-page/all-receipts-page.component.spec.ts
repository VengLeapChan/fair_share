import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReceiptsPageComponent } from './all-receipts-page.component';

describe('AllReceiptsPageComponent', () => {
  let component: AllReceiptsPageComponent;
  let fixture: ComponentFixture<AllReceiptsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllReceiptsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllReceiptsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
