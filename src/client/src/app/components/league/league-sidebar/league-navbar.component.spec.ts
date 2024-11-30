import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueNavbarComponent } from './league-navbar.component';

describe('LeagueSidebarComponent', () => {
  let component: LeagueNavbarComponent;
  let fixture: ComponentFixture<LeagueNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
