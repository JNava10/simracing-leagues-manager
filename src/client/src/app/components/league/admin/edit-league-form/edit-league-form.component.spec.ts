import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeagueFormComponent } from './edit-league-form.component';

describe('EditLeagueFormComponent', () => {
  let component: EditLeagueFormComponent;
  let fixture: ComponentFixture<EditLeagueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLeagueFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLeagueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
