import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueAdminPanelComponent } from './league-admin-panel.component';

describe('LeagueAdminPanelComponent', () => {
  let component: LeagueAdminPanelComponent;
  let fixture: ComponentFixture<LeagueAdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueAdminPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
