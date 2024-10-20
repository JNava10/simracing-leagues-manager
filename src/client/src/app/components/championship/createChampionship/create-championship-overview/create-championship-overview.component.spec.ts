import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChampionshipOverviewComponent } from './create-championship-overview.component';

describe('CreateChampionshipOverviewComponent', () => {
  let component: CreateChampionshipOverviewComponent;
  let fixture: ComponentFixture<CreateChampionshipOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateChampionshipOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChampionshipOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
