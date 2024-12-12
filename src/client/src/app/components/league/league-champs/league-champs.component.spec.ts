import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueChampsComponent } from './league-champs.component';

describe('LeagueChampsComponent', () => {
  let component: LeagueChampsComponent;
  let fixture: ComponentFixture<LeagueChampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueChampsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueChampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
