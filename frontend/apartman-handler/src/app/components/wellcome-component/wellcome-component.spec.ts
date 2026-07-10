import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellcomeComponent } from './wellcome-component';

describe('Wellcome', () => {
  let component: WellcomeComponent;
  let fixture: ComponentFixture<WellcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WellcomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WellcomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
