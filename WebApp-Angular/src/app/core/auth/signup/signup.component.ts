import { Component, OnInit } from '@angular/core';
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
import { AuthService } from '../../services/register.service'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  successMessage = '';

  // Holds ALL backend validation errors as a flat list of strings
  backendErrors: string[] = [];

  // Holds field-level backend errors mapped by field name (lowercase)
  backendFieldErrors: { [field: string]: string[] } = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      street: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^01[0-9]{9}$/)],
      ],
      password: [
  '',
  [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    ),
  ],
],
    });
  }

  // Convenience getter for template access
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  // Check if a field has a client-side error (touched or submitted)
  hasError(field: string, error: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control?.hasError(error) && (control.dirty || control.touched));
  }

  // Check if a field has a backend error
  hasBackendError(field: string): boolean {
    return !!this.backendFieldErrors[field]?.length;
  }

  // Get backend error messages for a specific field
  getBackendError(field: string): string[] {
    return this.backendFieldErrors[field] || [];
  }

  // Clear backend errors when user starts typing
  onFieldInput(field: string): void {
    const lowerField = field.toLowerCase();
    if (this.backendFieldErrors[lowerField]) {
      delete this.backendFieldErrors[lowerField];
    }
    // Clear the flat error list too if user is fixing things
    if (this.backendErrors.length) {
      this.backendErrors = [];
    }
  }

  onSubmit(): void {
    // Reset previous errors
    this.backendErrors = [];
    this.backendFieldErrors = {};
    this.successMessage = '';

    // Mark all fields as touched to show client-side validation
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;

    const payload = {
      fullName: this.f['fullName'].value.trim(),
      email: this.f['email'].value.trim(),
      password: this.f['password'].value,
      phoneNumber: this.f['phoneNumber'].value.trim(),
      city: this.f['city'].value.trim(),
      street: this.f['street'].value.trim(),
    };

    this.authService.registerSpecialist(payload).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = response.message;
        // Navigate to login after short delay so user sees success message
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.parseBackendError(error);
      },
    });
  }

  private parseBackendError(error: HttpErrorResponse): void {
    if (!error.error) {
      this.backendErrors = ['An unexpected error occurred. Please try again.'];
      return;
    }

    const body = error.error;

    // ASP.NET Core validation error format (400 with `errors` object)
    if (body.errors && typeof body.errors === 'object') {
      // Map field-level errors (normalize keys to lowercase for template matching)
      Object.keys(body.errors).forEach((field) => {
        const normalizedKey = field.toLowerCase();
        this.backendFieldErrors[normalizedKey] = body.errors[field];
        // Also push to flat list for a general error banner
        (body.errors[field] as string[]).forEach((msg: string) => {
          this.backendErrors.push(msg);
        });
      });
      return;
    }

    // Single message error (e.g. email already exists)
    if (body.message) {
      this.backendErrors = [body.message];
      return;
    }

    // Fallback: stringify whatever came back
    this.backendErrors = [
      typeof body === 'string' ? body : 'Registration failed. Please try again.',
    ];
  }
}