import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationPage } from './automation.page';

describe('AutomationPage', () => {
  let component: AutomationPage;
  let fixture: ComponentFixture<AutomationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
