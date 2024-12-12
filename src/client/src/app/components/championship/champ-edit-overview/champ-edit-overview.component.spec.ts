import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampEditOverviewComponent } from './champ-edit-overview.component';

describe('ChampEditOverviewComponent', () => {
  let component: ChampEditOverviewComponent;
  let fixture: ComponentFixture<ChampEditOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampEditOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampEditOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
