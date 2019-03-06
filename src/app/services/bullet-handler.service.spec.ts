import { TestBed } from '@angular/core/testing';

import { BulletHandlerService } from './bullet-handler.service';

describe('BulletHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BulletHandlerService = TestBed.get(BulletHandlerService);
    expect(service).toBeTruthy();
  });
});
