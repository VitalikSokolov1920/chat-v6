import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDialogComponent } from './current-dialog.component';

describe('CurrentDialogComponent', () => {
  let component: CurrentDialogComponent;
  let fixture: ComponentFixture<CurrentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
