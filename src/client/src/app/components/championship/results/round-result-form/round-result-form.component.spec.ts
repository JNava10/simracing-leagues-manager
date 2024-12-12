import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundResultFormComponent } from './round-result-form.component';

describe('RoundResultFormComponent', () => {
  let component: RoundResultFormComponent;
  let fixture: ComponentFixture<RoundResultFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundResultFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundResultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
