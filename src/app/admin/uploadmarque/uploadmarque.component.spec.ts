import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadmarqueComponent } from './uploadmarque.component';

describe('UploadmarqueComponent', () => {
  let component: UploadmarqueComponent;
  let fixture: ComponentFixture<UploadmarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadmarqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadmarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
