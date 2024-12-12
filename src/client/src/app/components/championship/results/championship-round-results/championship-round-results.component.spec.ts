import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipRoundResultsComponent } from './championship-round-results.component';

describe('ChampionshipRoundResultsComponent', () => {
  let component: ChampionshipRoundResultsComponent;
  let fixture: ComponentFixture<ChampionshipRoundResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionshipRoundResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionshipRoundResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
