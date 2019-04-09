import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrfPage } from './srf.page';

describe('SrfPage', () => {
  let component: SrfPage;
  let fixture: ComponentFixture<SrfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
