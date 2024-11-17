import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRadioGroupComponent } from './custom-radio-group.component';

describe('CustomRadioGroupComponent', () => {
  let component: CustomRadioGroupComponent;
  let fixture: ComponentFixture<CustomRadioGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomRadioGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
