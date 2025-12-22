import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Changepasword } from './changepasword';

describe('Changepasword', () => {
  let component: Changepasword;
  let fixture: ComponentFixture<Changepasword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Changepasword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Changepasword);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
