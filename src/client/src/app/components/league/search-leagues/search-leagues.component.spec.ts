import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLeaguesComponent } from './search-leagues.component';

describe('SearchLeaguesComponent', () => {
  let component: SearchLeaguesComponent;
  let fixture: ComponentFixture<SearchLeaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchLeaguesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
