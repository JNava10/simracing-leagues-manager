import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFileDragDropComponent } from './custom-file-drag-drop.component';

describe('CustomFileDragDropComponent', () => {
  let component: CustomFileDragDropComponent;
  let fixture: ComponentFixture<CustomFileDragDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFileDragDropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFileDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
