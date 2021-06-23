import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulteProfilComponent } from './consulte-profil.component';

describe('ConsulteProfilComponent', () => {
  let component: ConsulteProfilComponent;
  let fixture: ComponentFixture<ConsulteProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulteProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulteProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
