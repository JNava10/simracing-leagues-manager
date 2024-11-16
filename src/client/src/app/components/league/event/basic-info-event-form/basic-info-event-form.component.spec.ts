import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoEventFormComponent } from './basic-info-event-form.component';

describe('BasicInfoEventFormComponent', () => {
  let component: BasicInfoEventFormComponent;
  let fixture: ComponentFixture<BasicInfoEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicInfoEventFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicInfoEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
