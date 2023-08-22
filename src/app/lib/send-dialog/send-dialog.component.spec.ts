import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SendDialogComponent } from './send-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SendDialogComponent', () => {
  let component: SendDialogComponent;
  let fixture: ComponentFixture<SendDialogComponent>;
  let mockMatDialogRef: MatDialogRef<SendDialogComponent>;
  let mockMatDialogData: { task: any };
  let mockFormBuilder: FormBuilder;

  beforeEach(() => {
    mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockMatDialogData = { task: { /* mock task data here */ } };
    mockFormBuilder = jasmine.createSpyObj('FormBuilder', ['group']);

    TestBed.configureTestingModule({
      declarations: [SendDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockMatDialogData },
        { provide: FormBuilder, useValue: mockFormBuilder }
      ],
      imports: [ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatToolbarModule,
        MatTableModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(SendDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on cancel', () => {
    component.cancel();
    expect(mockMatDialogRef.close).toHaveBeenCalledOnceWith();
  });
});
