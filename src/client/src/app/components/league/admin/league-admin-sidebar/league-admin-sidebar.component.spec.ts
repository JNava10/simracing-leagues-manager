import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueAdminSidebarComponent } from './league-admin-sidebar.component';

describe('LeagueAdminSidebarComponent', () => {
  let component: LeagueAdminSidebarComponent;
  let fixture: ComponentFixture<LeagueAdminSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueAdminSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueAdminSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
