import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { TaskService } from 'src/app/shared/services/task.service';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private taskService: TaskService
  ) {}

  confirmDelete() {
    this.taskService.deleteTask(this.data.task.id)
    this.dialogRef.close(true); // Fecha o diálogo e retorna um resultado para o componente pai
  }

  cancel() {
    this.dialogRef.close(false); // Fecha o diálogo sem confirmar a exclusão
  }
}
