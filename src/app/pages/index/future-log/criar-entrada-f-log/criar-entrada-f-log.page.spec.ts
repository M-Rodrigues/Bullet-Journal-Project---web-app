import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEntradaFLogPage } from './criar-entrada-f-log.page';

describe('CriarEntradaFLogPage', () => {
  let component: CriarEntradaFLogPage;
  let fixture: ComponentFixture<CriarEntradaFLogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarEntradaFLogPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarEntradaFLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
