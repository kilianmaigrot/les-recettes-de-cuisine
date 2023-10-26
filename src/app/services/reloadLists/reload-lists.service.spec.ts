import { TestBed } from '@angular/core/testing';

import { ReloadListsService } from './reload-lists.service';

describe('ReloadListsService', () => {
  let service: ReloadListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReloadListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
