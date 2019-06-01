import { TestBed } from '@angular/core/testing';

import { TaskPageService } from './task-page.service';

describe('TaskPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskPageService = TestBed.get(TaskPageService);
    expect(service).toBeTruthy();
  });
});
