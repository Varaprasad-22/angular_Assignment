import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredPassword } from './expired-password';

describe('ExpiredPassword', () => {
  let component: ExpiredPassword;
  let fixture: ComponentFixture<ExpiredPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiredPassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiredPassword);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
