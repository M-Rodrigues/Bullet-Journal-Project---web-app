import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCollectionsPage } from './custom-collections.page';

describe('CustomCollectionsPage', () => {
  let component: CustomCollectionsPage;
  let fixture: ComponentFixture<CustomCollectionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCollectionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCollectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
