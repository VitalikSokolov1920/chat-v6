import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityListItemComponent } from './community-list-item.component';

describe('CommunityListItemComponent', () => {
  let component: CommunityListItemComponent;
  let fixture: ComponentFixture<CommunityListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
