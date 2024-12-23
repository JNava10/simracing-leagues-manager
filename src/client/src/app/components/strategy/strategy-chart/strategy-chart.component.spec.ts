import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyChartComponent } from './strategy-chart.component';

describe('StrategyChartComponent', () => {
  let component: StrategyChartComponent;
  let fixture: ComponentFixture<StrategyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategyChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
