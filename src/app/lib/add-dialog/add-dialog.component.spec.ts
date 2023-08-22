import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { of } from 'rxjs';

import { TaskService } from 'src/app/shared/services/task.service';
import { AddDialogComponent } from './add-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from 'src/app/app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';

describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AddDialogComponent>>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  const mockTask: Task = {
    id: 1,
    name: 'Test Task',
    username: 'testuser',
    title: 'Test Title',
    value: 100,
    date: '2023-08-21',
    image: '',
    isPayed: false,
  };


  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['addTask']);

    TestBed.configureTestingModule({
      declarations: [AddDialogComponent],
      imports: [ReactiveFormsModule, HttpClientModule, AppModule, RouterTestingModule  ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { task: mockTask } },
        { provide: TaskService, useValue: taskServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with new task when addTask is called', () => {
    component.newTask = mockTask;
    component.addTask();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(mockTask);
  });

  it('should close dialog without new task when cancel is called', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
