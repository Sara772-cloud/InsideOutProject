import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { Router, RouterLink } from '@angular/router';
import { Settings, UpdateSettingsPayload } from '../../core/models/settings.interface';
import { SettingsService } from '../../core/services/settings.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [SidebarComponent, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  // ─── Services ────────────────────────────────────────────────────────────────
  private readonly settingsService = inject(SettingsService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  // ─── State ───────────────────────────────────────────────────────────────────
  ReSettings!: Settings;
  specialistId = localStorage.getItem('userId') ?? ''; // replace with token-decoded id if available

  // Edit Profile Modal
  showEditModal = false;
  editForm!: FormGroup;
  isUpdating = false;
  updateSuccess = false;
  updateErrorMsg = '';

  // Delete Modal
  showDeleteModal = false;
  isDeleting = false;
  deleteErrorMsg = '';

  // ─── Lifecycle ───────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.buildEditForm();
    this.loadSpecialistData();
  }

  // ─── Form Setup ──────────────────────────────────────────────────────────────
  buildEditForm(): void {
    this.editForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      city: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  // ─── Load Data ───────────────────────────────────────────────────────────────
  loadSpecialistData(): void {
    this.settingsService.getSpecialistById(this.specialistId).subscribe({
      next: (res) => {
        this.ReSettings = res;
      },
      error: (err) => {
        console.error('Failed to load specialist data:', err);
      },
    });
  }

  // ─── Edit Profile ─────────────────────────────────────────────────────────────
  openEditModal(): void {
    this.updateSuccess = false;
    this.updateErrorMsg = '';
    // Pre-fill form with current data
    this.editForm.patchValue({
      fullName: this.ReSettings?.name ?? '',
      email: this.ReSettings?.email ?? '',
      phone: this.ReSettings?.phone ?? '',
      city: this.ReSettings?.city ?? '',
      street: this.ReSettings?.street ?? '',
    });
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editForm.reset();
    this.updateSuccess = false;
    this.updateErrorMsg = '';
  }

  submitEditForm(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.isUpdating = true;
    this.updateErrorMsg = '';
    this.updateSuccess = false;

    const payload: UpdateSettingsPayload = this.editForm.value;

    this.settingsService.updateSpecialist(this.specialistId, payload).subscribe({
      next: () => {
        this.isUpdating = false;
        this.updateSuccess = true;
        // Refresh displayed data
        this.loadSpecialistData();
        // Auto-close modal after 1.5s on success
        setTimeout(() => this.closeEditModal(), 1500);
      },
      error: (err) => {
        this.isUpdating = false;
        // Handle backend error messages
        if (err.error) {
          if (typeof err.error === 'string') {
            this.updateErrorMsg = err.error;
          } else if (err.error.message) {
            this.updateErrorMsg = err.error.message;
          } else if (err.error.errors) {
            // validation errors object from backend
            const msgs = Object.values(err.error.errors).flat();
            this.updateErrorMsg = (msgs as string[]).join(' ');
          } else {
            this.updateErrorMsg = 'Something went wrong. Please try again.';
          }
        } else {
          this.updateErrorMsg = 'Network error. Please check your connection.';
        }
      },
    });
  }

  // ─── Delete Account ───────────────────────────────────────────────────────────
  openDeleteModal(): void {
    this.deleteErrorMsg = '';
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deleteErrorMsg = '';
  }

  confirmDelete(): void {
    this.isDeleting = true;
    this.deleteErrorMsg = '';

    this.settingsService.deleteSpecialist(this.specialistId).subscribe({
      next: () => {
        this.isDeleting = false;
        // Navigate to login after successful deletion
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isDeleting = false;
        if (err.error) {
          if (typeof err.error === 'string') {
            this.deleteErrorMsg = err.error;
          } else if (err.error.message) {
            this.deleteErrorMsg = err.error.message;
          } else {
            this.deleteErrorMsg = 'Failed to delete account. Please try again.';
          }
        } else {
          this.deleteErrorMsg = 'Network error. Please check your connection.';
        }
      },
    });
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  getFieldError(field: string): string {
    const control = this.editForm.get(field);
    if (!control || !control.touched || !control.errors) return '';

    if (control.errors['required']) return `${this.fieldLabel(field)} is required.`;
    if (control.errors['email']) return 'Please enter a valid email address.';
    if (control.errors['minlength'])
      return `${this.fieldLabel(field)} must be at least ${control.errors['minlength'].requiredLength} characters.`;
    if (control.errors['pattern']) return 'Please enter a valid phone number (digits only).';
    return '';
  }

  private fieldLabel(field: string): string {
    const labels: Record<string, string> = {
      fullName: 'Full name',
      email: 'Email',
      phone: 'Phone number',
      city: 'City',
      street: 'Street',
    };
    return labels[field] ?? field;
  }
}