import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueSearchComponent } from './league-search.component';

describe('LeagueSearchComponent', () => {
  let component: LeagueSearchComponent;
  let fixture: ComponentFixture<LeagueSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
