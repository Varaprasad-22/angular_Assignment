import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllFlights } from './get-all-flights';

describe('GetAllFlights', () => {
  let component: GetAllFlights;
  let fixture: ComponentFixture<GetAllFlights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllFlights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllFlights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
