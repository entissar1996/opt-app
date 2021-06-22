import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTryOnComponent } from './product-try-on.component';

describe('ProductTryOnComponent', () => {
  let component: ProductTryOnComponent;
  let fixture: ComponentFixture<ProductTryOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTryOnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTryOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
