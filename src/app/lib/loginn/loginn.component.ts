import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.inteface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-loginn',
  templateUrl: './loginn.component.html',
  styleUrls: ['./loginn.component.css'],
})
export class LoginnComponent implements OnInit {
  user: User ={ email: '', password: '' };
  email!: string;
  password!: string;
  form!: FormGroup;
  loginInvalid!: boolean;
  hide = true;
  showPassword: boolean = false;
  loginError: boolean = false;


  constructor(
    private fb: FormBuilder, private authService: AuthService, private router: Router
  ) {

    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.user);
    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.user);
  }
}
