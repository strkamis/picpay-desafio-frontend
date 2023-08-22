import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Task } from 'src/app/shared/interfaces/task.interface';
import { TaskService } from 'src/app/shared/services/task.service';
import { SendDialogComponent } from '../send-dialog/send-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  public tasks: Task[] = [];
  selectedTask: Task | null = null;
  currentPage = 1;
  newTask: Task = {
    id: 0,
    name: '',
    username: '',
    title: '',
    value: 0,
    date: '',
    image: '',
    isPayed: false
  };


  displayedColumns: string[] = [
    'Usuário',
    'Título',
    'Data',
    'Pago',
    'Valor',
    'Ações',
  ];
  dataSource = new MatTableDataSource<Task>(this.tasks);

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadTasks();
    this.dataSource.sort = this.sort;
  }

  //filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadTasks() {
    this.taskService.getTasks(this.currentPage + 1).subscribe((res) => {
      this.tasks = res;
      this.dataSource.data = this.tasks;
    });
  }

  updateTask(taskId: number, updatedTask: Task) {
    this.taskService.updateTask(taskId, updatedTask).subscribe(() => {
      this.loadTasks();
      this.selectedTask = null; // Reset the selected task
    });
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId,).subscribe(() => {
      this.loadTasks();
      this.selectedTask = null; // Reset the selected task
    });
  }

  addTask() {
    this.taskService.createTask(this.newTask).subscribe((addedTask) => {
      console.log('Tarefa adicionada:', addedTask);
      // Limpe o formulário ou realize outras ações após a adição
      this.newTask = {
        id: 0,
        name: '',
        username: '',
        title: '',
        value: 0,
        date: '',
        image: '',
        isPayed: false
      };
    });
  }

  //dialog excluir
  openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      height: '300px',
      data: { task }, // Passa a tarefa para o diálogo de exclusão
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.deleteTask(task.id).subscribe(() => {
          this.loadTasks();
        }); // Chama a função para excluir a tarefa
      }
    });
  }

  //dialog enviar
  openDialog(task: Task): void {
    const dialogRef = this.dialog.open(SendDialogComponent, {
      data: { task },
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.taskService.updateTask(task.id, result).subscribe(() => {
          this.loadTasks();
        });
    });
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((newTask: Task) => {
      if (newTask && newTask.name !== '') {
        this.taskService.createTask(newTask).subscribe(() => {
          this.loadTasks();
        });

        console.log('Nova tarefa adicionada:', newTask);
      }
    });
  }

  //paginção
  nextPage() {
    this.currentPage++;
    this.loadTasks();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTasks();
    }
  }

  // Ordenação
  sortData(event: any) {
    const isAsc = event.direction === 'asc';
    const column = event.active;

    this.tasks.sort((a, b) => {
      switch (column) {
        case 'Usuário':
          return this.compare(a.name, b.name, isAsc);
        case 'Título':
          return this.compare(a.title, b.title, isAsc);
        case 'Data':
          return this.compare(a.date, b.date, isAsc);
        case 'Pago':
          return this.compare(a.value, b.value, isAsc);
        case 'Valor':
          return this.compare(a.isPayed, b.isPayed, isAsc);
        default:
          return 0;
      }
    });

    this.dataSource.data = this.tasks;
  }

  compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
 }
