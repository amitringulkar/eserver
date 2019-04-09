import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadCountPage } from './head-count.page';

describe('HeadCountPage', () => {
  let component: HeadCountPage;
  let fixture: ComponentFixture<HeadCountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadCountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadCountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
