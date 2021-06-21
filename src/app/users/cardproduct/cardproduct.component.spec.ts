import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardproductComponent } from './cardproduct.component';

describe('CardproductComponent', () => {
  let component: CardproductComponent;
  let fixture: ComponentFixture<CardproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
