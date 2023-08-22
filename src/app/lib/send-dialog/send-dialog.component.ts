import {Component, Inject, OnInit} from '@angular/core';


import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-send-dialog',
  templateUrl: './send-dialog.component.html',
  styleUrls: ['./send-dialog.component.css']
})
export class SendDialogComponent implements OnInit {
  public form!: FormGroup;
  editedTask: Task;


  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {task: Task}, private fb: FormBuilder
  ) {
    this.editedTask = { ...data.task };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required]

    });

  }
  save(){
    this.dialogRef.close(this.editedTask);
  }

  cancel(){
    this.dialogRef.close();
  }


}
