import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomethingWentWrongComponent } from './something-went-wrong-component';

describe('SomethingWentWrongComponent', () => {
  let component: SomethingWentWrongComponent;
  let fixture: ComponentFixture<SomethingWentWrongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SomethingWentWrongComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SomethingWentWrongComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
