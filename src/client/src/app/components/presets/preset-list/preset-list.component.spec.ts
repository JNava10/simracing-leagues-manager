import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetListComponent } from './preset-list.component';

describe('PresetListComponent', () => {
  let component: PresetListComponent;
  let fixture: ComponentFixture<PresetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresetListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
