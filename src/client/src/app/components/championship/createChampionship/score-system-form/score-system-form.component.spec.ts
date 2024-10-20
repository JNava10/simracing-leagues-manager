import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreSystemFormComponent } from './score-system-form.component';

describe('ScoreSystemFormComponent', () => {
  let component: ScoreSystemFormComponent;
  let fixture: ComponentFixture<ScoreSystemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreSystemFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreSystemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
