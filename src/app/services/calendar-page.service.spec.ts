import { TestBed } from '@angular/core/testing';

import { CalendarPageService } from './calendar-page.service';

describe('CalendarPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarPageService = TestBed.get(CalendarPageService);
    expect(service).toBeTruthy();
  });
});
