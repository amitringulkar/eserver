import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuePage } from './revenue.page';

describe('RevenuePage', () => {
  let component: RevenuePage;
  let fixture: ComponentFixture<RevenuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenuePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
