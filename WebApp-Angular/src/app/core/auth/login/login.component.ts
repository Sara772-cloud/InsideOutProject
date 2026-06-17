import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../../services/login.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  backendError = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  hasError(field: string, error: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control?.hasError(error) && (control.dirty || control.touched));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onFieldInput(): void {
    if (this.backendError) {
      this.backendError = '';
    }
  }

  onSubmit(): void {
    this.backendError = '';
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) return;

    this.isLoading = true;

    const payload = {
      email: this.f['email'].value.trim(),
      password: this.f['password'].value,
    };

    this.loginService.login(payload).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          localStorage.setItem('userId', response.frontendId.toString());
          localStorage.setItem('userEmail', response.email);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.parseBackendError(error);
      },
    });
  }

  private parseBackendError(error: HttpErrorResponse): void {
    if (!error.error) {
      this.backendError = 'An unexpected error occurred. Please try again.';
      return;
    }

    const body = error.error;

    if (body.detail) {
      this.backendError = body.detail;
      return;
    }

    if (body.message) {
      this.backendError = body.message;
      return;
    }

    this.backendError =
      typeof body === 'string' ? body : 'Login failed. Please try again.';
  }
}