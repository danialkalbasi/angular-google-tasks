import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { By } from '@angular/platform-browser';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  const tasksData = [
    { id: '1', status: 'completed', due: '3/28/2018', title: 'task 1' },
    { id: '2', sttaus: 'notcompleted', due: '3/28/2018', title: 'task 2' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TasksComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  describe('tasks @Input', () => {
    beforeEach(() => {
      component.tasks = tasksData;
    });

    it('should receive the data from parent', () => {
      // Assert
      expect(component.tasks).toEqual(tasksData);
    });

    it('should bind the data to the view', () => {
      // Act
      fixture.detectChanges();
      const numberOfDisplayedTasks = fixture.debugElement.query(By.css('.tasks')).children.length;

      // Assert
      expect(numberOfDisplayedTasks).toBe(2);
    });

    it('should shows the message that tasks is empty in view', () => {
      // Arrange
      component.tasks = [];

      // Act
      fixture.detectChanges();
      const isFindEmptyMessage = fixture.debugElement.query(By.css('.tasks')).children.length;

      // Assert
      expect(isFindEmptyMessage).toBe(1);
    });

    it('should have id and title properties in each list item', () => {
      // Act
      const listProps = Object.getOwnPropertyNames(component.tasks[0]);
      const validProps = ['id', 'status', 'due', 'title'];

      // Assert
      expect(listProps).toEqual(validProps);
    });
  });
});
