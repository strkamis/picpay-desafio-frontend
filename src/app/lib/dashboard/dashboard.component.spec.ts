import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { Task } from 'src/app/shared/interfaces/task.interface';
import { TaskService } from 'src/app/shared/services/task.service';
import { DashboardComponent } from './dashboard.component';
import { SendDialogComponent } from '../send-dialog/send-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { AppComponent } from 'src/app/app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let taskService: TaskService;
  let dialog: MatDialog;

  const mockTask: Task = {
    id: 169,
    name: 'Camilla Doxey',
    username: 'cdoxey4o',
    title: 'Engineer III',
    value: 435.63,
    date: '2021-01-09T14:00:37Z',
    image: 'https://robohash.org/doloribuslaborequi.png?size=150x150&set=set1',
    isPayed: false,
  };

  const mockTasks: Task[] = [
    mockTask,
    { id: 2, name: 'Task 2', username: 'user2', title: 'Title 2', value: 200, date: '2023-08-22', image: '', isPayed: true }
  ];

  const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTasks', 'updateTask', 'deleteTask', 'createTask']);
  let getTasksSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        SendDialogComponent,
        DeleteDialogComponent,
        AddDialogComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatToolbarModule,
        MatTableModule,
        MatDialogModule,
        MatSortModule
      ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: MatDialog, useValue: {} },
        {
          provide: TaskService,
          useValue: {
            // Criar o spy para o método getTasks
            getTasks: getTasksSpy = jasmine.createSpy('getTasks').and.returnValue(of(mockTasks)),
            // Outros spies para os métodos restantes
            updateTask: jasmine.createSpy('updateTask').and.returnValue(of({})),
            deleteTask: jasmine.createSpy('deleteTask').and.returnValue(of({})),
            createTask: jasmine.createSpy('createTask').and.returnValue(of({})),
          },
        }
      ],
    }).compileComponents();


    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    taskServiceSpy.getTasks.and.returnValue(of([mockTask]));
    component.tasks = mockTasks; // Mock tasks for testing
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    taskServiceSpy.getTasks.and.returnValue(of(mockTasks));

    component.ngOnInit();

    expect(component.tasks).toEqual(mockTasks);
    expect(component.dataSource.data).toEqual(mockTasks);
  });

  it('should apply filter correctly', () => {
    const filterValue = 'Test Task';

    component.applyFilter({ target: { value: filterValue } } as unknown as Event);

    expect(component.dataSource.filter).toBe(filterValue.toLowerCase());
  });

  it('should navigate to next page on nextPage', () => {
    component.currentPage = 1;
    spyOn(component, 'loadTasks');

    component.nextPage();

    expect(component.currentPage).toBe(2);
    expect(component.loadTasks).toHaveBeenCalled();
  });

  it('should navigate to previous page on prevPage', () => {
    component.currentPage = 2;
    spyOn(component, 'loadTasks');

    component.prevPage();

    expect(component.currentPage).toBe(1);
    expect(component.loadTasks).toHaveBeenCalled();
  });
});
