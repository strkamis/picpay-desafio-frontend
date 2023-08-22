import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Task } from '../interfaces/task.interface';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);  });

    afterEach(() => {
      httpTestingController.verify();
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create task', () => {
    const newTask: Task = {
      id: 169,
      name: 'Camilla Doxey',
      username: 'cdoxey4o',
      title: 'Engineer III',
      value: 435.63,
      date: '2021-01-09T14:00:37Z',
      image: 'https://robohash.org/doloribuslaborequi.png?size=150x150&set=set1',
      isPayed: false
    };

    spyOn(service, 'getApiUrl').and.returnValue('http://localhost:3030'); // Mock the apiUrl

    service.createTask(newTask).subscribe((task) => {
      expect(task).toEqual(newTask);
    });

    const req = httpTestingController.expectOne(`${service.getApiUrl()}/tasks`);
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });

  it('should get tasks', () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        name: 'Task 1',
        username: 'user1',
        title: 'Title 1',
        value: 100,
        date: '2023-08-21',
        image: '',
        isPayed: false,
      },
      {
        id: 2,
        name: 'Task 2',
        username: 'user2',
        title: 'Title 2',
        value: 200,
        date: '2023-08-22',
        image: '',
        isPayed: true,
      }
    ];
    const page = 1;

    service.getTasks(page).subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpTestingController.expectOne(`${service.getApiUrl()}/tasks?_page=${page}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });
  it('should delete task', () => {
    const taskId = 1;

    service.deleteTask(taskId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.getApiUrl()}/tasks/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update task', () => {
    const taskId = 1;
    const updatedTask: Task = {
      id: 1,
      name: 'Updated Task',
      username: 'user1',
      title: 'Updated Title',
      value: 150,
      date: '2023-08-23',
      image: '',
      isPayed: true,
    };

    service.updateTask(taskId, updatedTask).subscribe((task) => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpTestingController.expectOne(`${service.getApiUrl()}/tasks/${taskId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

});
