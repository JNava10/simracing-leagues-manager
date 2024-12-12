import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamResultsTableComponent } from './team-results-table.component';

describe('TeamResultsTableComponent', () => {
  let component: TeamResultsTableComponent;
  let fixture: ComponentFixture<TeamResultsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamResultsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
