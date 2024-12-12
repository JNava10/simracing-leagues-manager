import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueMembersBarComponent } from './league-members-bar.component';

describe('LeagueMembersBarComponent', () => {
  let component: LeagueMembersBarComponent;
  let fixture: ComponentFixture<LeagueMembersBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueMembersBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueMembersBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
