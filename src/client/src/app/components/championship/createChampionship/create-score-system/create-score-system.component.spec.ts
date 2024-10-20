import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScoreSystemComponent } from './create-score-system.component';

describe('CreateScoreSystemComponent', () => {
  let component: CreateScoreSystemComponent;
  let fixture: ComponentFixture<CreateScoreSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateScoreSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateScoreSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
