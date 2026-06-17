import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { ParentList } from '../../core/models/parent-list.interface';
import { ChildrenList } from '../../core/models/children-list.interface';
import { PredefinedTasks } from '../../core/models/predefined-tasks.interface';
import { GeneralService } from '../../core/services/general.service';
import { PredefinedSerService } from '../../core/services/predefined-ser.service';
import { AssignTaskService } from '../../core/services/assign-task.service';
import { AiTaskService, AiTaskResponse } from '../../core/services/ai-task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assigntask',
  imports: [SidebarComponent, FormsModule],
  templateUrl: './assigntask.component.html',
  styleUrl: './assigntask.component.css',
})
export class AssigntaskComponent implements OnInit {

  // ── بيانات الـ Parents والـ Predefined Tasks ────────────────
  Parents: ParentList[] = [];
  PredeTasks: PredefinedTasks[] = [];
  selectedParent: ParentList | null = null;
  selectedChild: ChildrenList | null = null;
  selectedPredefinedTaskId: number | null = null;
  readonly specialistId: string = localStorage.getItem('userId') ?? '';

  // ── بيانات الـ Manual Task Creator ─────────────────────────
  taskTitle: string = '';
  taskDescription: string = '';
  taskDueDate: string = '';
  taskType: string = 'REALWORLD';

  // ── UI Handling ─────────────────────────────────────────────
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  // ── AI Task ─────────────────────────────────────────────────
  userPrompt: string = '';
  aiGeneratedTask: AiTaskResponse | null = null;
  isGeneratingTask: boolean = false;
  aiErrorMessage: string = '';

  // ── Services Injection ──────────────────────────────────────
  private readonly generalService       = inject(GeneralService);
  private readonly predefinedSerService = inject(PredefinedSerService);
  private readonly assignTaskService    = inject(AssignTaskService);
  private readonly aiTaskService        = inject(AiTaskService);

  // ────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.getAllGeneralData();
    this.getAllPredefindData();
  }

  // ── جيب الـ Parents والـ Children ───────────────────────────
  getAllGeneralData(): void {
    this.generalService.getGeneralData(this.specialistId).subscribe({
      next: (res) => {
        console.log(res);
        this.Parents = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // ── جيب الـ Predefined Tasks ─────────────────────────────────
  getAllPredefindData(): void {
    this.predefinedSerService.getPredefinedData().subscribe({
      next: (res) => {
        console.log(res);
        this.PredeTasks = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // ── اختيار Predefined Task → يملا الـ Manual Form ───────────
  selectPredefinedTask(preTask: PredefinedTasks): void {
    this.taskTitle       = preTask.title;
    this.taskDescription = preTask.description;
    this.taskDueDate     = '';
    this.selectedPredefinedTaskId = preTask.id;

    const typeMap: { [key: string]: string } = {
      'REALWORLD'  : 'REALWORLD',
      'Real-world' : 'REALWORLD',
      'MOBILE'     : 'MOBILE',
      'Mobile'     : 'MOBILE'
    };
    this.taskType = typeMap[preTask.taskType] ?? 'REALWORLD';
  }

  // ── AI: بعت الـ Prompt للـ API ───────────────────────────────
  generateAiTask(): void {
    if (!this.userPrompt.trim()) return;

    this.isGeneratingTask = true;
    this.aiGeneratedTask  = null;
    this.aiErrorMessage   = '';

    this.aiTaskService.generateAiTask(this.userPrompt).subscribe({
      next: (res) => {
        this.aiGeneratedTask  = res;
        this.isGeneratingTask = false;
      },
      error: (err) => {
        console.error(err);
        this.aiErrorMessage   = 'Failed to generate task. Please try again.';
        this.isGeneratingTask = false;
      }
    });
  }

  // ── AI: Approve → يملا الـ Manual Task Creator ───────────────
  approveAiTask(): void {
    if (!this.aiGeneratedTask) return;
    this.taskTitle       = this.aiGeneratedTask.title;
    this.taskDescription = this.aiGeneratedTask.description;
    this.taskType        = 'REALWORLD';
    this.selectedPredefinedTaskId = null;
  }

  // ── AI: ترجع للـ Prompt Input تاني ──────────────────────────
  resetAiTask(): void {
    this.aiGeneratedTask = null;
    this.userPrompt      = '';
    this.aiErrorMessage  = '';
  }

  // ── Assign Task للـ Backend ──────────────────────────────────
  onAssignTask(): void {
    if (!this.selectedChild) {
      this.errorMessage = 'Please select a child first.';
      return;
    }
    if (!this.taskTitle.trim()) {
      this.errorMessage = 'Please enter a task title.';
      return;
    }
    if (!this.taskDueDate) {
      this.errorMessage = 'Please select a due date.';
      return;
    }

    const taskData: any = {
      title        : this.taskTitle,
      description  : this.taskDescription,
taskType: this.taskType,
      dueDate      : this.taskDueDate,
      specialistId : Number(this.specialistId),
      childId      : this.selectedChild.id as number
    };

    if (this.selectedPredefinedTaskId !== null) {
      taskData.predefinedTaskId = this.selectedPredefinedTaskId;
    }

    this.isLoading      = true;
    this.errorMessage   = '';
    this.successMessage = '';

    this.assignTaskService.assignTaskData(taskData).subscribe({
      next: () => {
        this.successMessage = `Task assigned to ${this.selectedChild?.name} successfully!`;
        this.isLoading = false;
        this.resetForm();
        setTimeout(() => { this.successMessage = ''; }, 3000);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Something went wrong. Please try again.';
        this.isLoading    = false;
      }
    });
  }

  // ── Reset الـ Manual Task Creator Form ──────────────────────
  resetForm(): void {
    this.taskTitle              = '';
    this.taskDescription        = '';
    this.taskDueDate            = '';
    this.taskType               = 'REALWORLD';
    this.selectedPredefinedTaskId = null;
  }
}