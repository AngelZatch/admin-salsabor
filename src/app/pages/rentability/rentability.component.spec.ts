import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentabilityComponent } from './rentability.component';

describe('RentabilityComponent', () => {
  let component: RentabilityComponent;
  let fixture: ComponentFixture<RentabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
