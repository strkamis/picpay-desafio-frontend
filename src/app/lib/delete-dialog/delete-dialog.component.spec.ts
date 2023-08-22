import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

import { DeleteDialogComponent } from './delete-dialog.component';
import { TaskService } from 'src/app/shared/services/task.service';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<DeleteDialogComponent>>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  const mockTask = {
    id: 169,
    name: 'Camilla Doxey',
    username: 'cdoxey4o',
    title: 'Engineer III',
    value: 435.63,
    date: '2021-01-09T14:00:37Z',
    image: 'https://robohash.org/doloribuslaborequi.png?size=150x150&set=set1',
    isPayed: false,
  };

  beforeEach(() => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);
    const taskServiceSpyObj = jasmine.createSpyObj('TaskService', ['deleteTask']);

    TestBed.configureTestingModule({
      declarations: [DeleteDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MAT_DIALOG_DATA, useValue: { task: mockTask } },
        { provide: TaskService, useValue: taskServiceSpyObj },
      ],
    });
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRefMock = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<DeleteDialogComponent>>;
    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm delete and close dialog', () => {
    component.confirmDelete();

    expect(taskServiceSpy.deleteTask).toHaveBeenCalledWith(mockTask.id);
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  it('should cancel delete and close dialog', () => {
    component.cancel();

    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });
});
