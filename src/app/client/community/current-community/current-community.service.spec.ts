import { TestBed } from '@angular/core/testing';

import { CurrentCommunityService } from './current-community.service';

describe('CurrentCommunityService', () => {
  let service: CurrentCommunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentCommunityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
