import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineStrategiesFormComponent } from './define-strategies-form.component';

describe('DefineStrategiesFormComponent', () => {
  let component: DefineStrategiesFormComponent;
  let fixture: ComponentFixture<DefineStrategiesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefineStrategiesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineStrategiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
