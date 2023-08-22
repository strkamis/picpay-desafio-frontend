import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginnComponent } from './loginn.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('LoginnComponent', () => {
  let component: LoginnComponent;
  let fixture: ComponentFixture<LoginnComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginnComponent],
      imports: [ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatToolbarModule,
        // MatTableDataSource,
        MatTableModule,
        MatDialogModule,
        MatPaginatorModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
      ],
    });
    fixture = TestBed.createComponent(LoginnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form and navigate on successful login', () => {
    const email = 'test@example.com';
    const password = 'password';

    authServiceSpy.login.and.returnValue(of(true));
    component.form.patchValue({ email, password });
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith(email, password);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.loginError).toBeFalse();
  });

  it('should show login error on failed login', () => {
    authServiceSpy.login.and.returnValue(of(false));
    component.form.patchValue({ email: 'test@example.com', password: 'password' });
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(component.loginError).toBeTrue();
  });

  it('should not submit form if it is invalid', () => {
    component.form.patchValue({ email: 'invalid-email', password: '' });
    component.onSubmit();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(component.loginError).toBeFalse();
  });

});
