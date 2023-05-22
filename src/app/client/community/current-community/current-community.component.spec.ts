import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCommunityComponent } from './current-community.component';

describe('CurrentCommunityComponent', () => {
  let component: CurrentCommunityComponent;
  let fixture: ComponentFixture<CurrentCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
