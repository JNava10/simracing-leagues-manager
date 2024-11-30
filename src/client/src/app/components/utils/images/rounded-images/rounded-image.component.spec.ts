import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedImageComponent } from './rounded-image.component';

describe('RoundedImagesComponent', () => {
  let component: RoundedImageComponent;
  let fixture: ComponentFixture<RoundedImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundedImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
