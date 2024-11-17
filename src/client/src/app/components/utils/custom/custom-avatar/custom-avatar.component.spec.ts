import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAvatarComponent } from './custom-avatar.component';

describe('CustomAvatarComponent', () => {
  let component: CustomAvatarComponent;
  let fixture: ComponentFixture<CustomAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
