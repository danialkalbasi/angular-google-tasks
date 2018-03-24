import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionControlsComponent } from './action-controls.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ActionControlsComponent', () => {
  let component: ActionControlsComponent;
  let fixture: ComponentFixture<ActionControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ActionControlsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });
});
