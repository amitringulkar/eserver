import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostPage } from './cost.page';

describe('CostPage', () => {
  let component: CostPage;
  let fixture: ComponentFixture<CostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
