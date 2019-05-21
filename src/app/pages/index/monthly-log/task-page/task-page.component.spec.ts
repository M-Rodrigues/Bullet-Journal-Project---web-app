import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPagePage } from './task-page.page';

describe('TaskPagePage', () => {
  let component: TaskPagePage;
  let fixture: ComponentFixture<TaskPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
