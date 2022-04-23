import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomImagePickerComponent } from './custom-image-picker.component';

describe('CustomImagePickerComponent', () => {
  let component: CustomImagePickerComponent;
  let fixture: ComponentFixture<CustomImagePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomImagePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomImagePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
