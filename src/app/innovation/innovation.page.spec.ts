import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationPage } from './innovation.page';

describe('InnovationPage', () => {
  let component: InnovationPage;
  let fixture: ComponentFixture<InnovationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
