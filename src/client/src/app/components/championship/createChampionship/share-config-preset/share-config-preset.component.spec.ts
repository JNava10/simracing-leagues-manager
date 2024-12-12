import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareConfigPresetComponent } from './share-config-preset.component';

describe('ShareConfigPresetComponent', () => {
  let component: ShareConfigPresetComponent;
  let fixture: ComponentFixture<ShareConfigPresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareConfigPresetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareConfigPresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
