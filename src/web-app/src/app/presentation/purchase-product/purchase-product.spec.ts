import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseProduct } from './purchase-product';

describe('PurchaseProduct', () => {
  let component: PurchaseProduct;
  let fixture: ComponentFixture<PurchaseProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
