import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPagePage } from './calendar-page.page';

describe('CalendarPagePage', () => {
  let component: CalendarPagePage;
  let fixture: ComponentFixture<CalendarPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
