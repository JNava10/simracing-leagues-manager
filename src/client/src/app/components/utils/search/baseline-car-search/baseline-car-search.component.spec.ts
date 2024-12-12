import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineCarSearchComponent } from './baseline-car-search.component';

describe('BaselineCarSearchComponent', () => {
  let component: BaselineCarSearchComponent;
  let fixture: ComponentFixture<BaselineCarSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaselineCarSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaselineCarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
