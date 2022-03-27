import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListItemComponent } from './dialog-list-item.component';

describe('DialogListItemComponent', () => {
  let component: DialogListItemComponent;
  let fixture: ComponentFixture<DialogListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
