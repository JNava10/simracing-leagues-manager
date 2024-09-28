import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueMainComponent } from './league-main.component';

describe('LeagueMainComponent', () => {
  let component: LeagueMainComponent;
  let fixture: ComponentFixture<LeagueMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
