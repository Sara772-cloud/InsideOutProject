import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { ParentList } from '../../core/models/parent-list.interface';
import { ChildrenList } from '../../core/models/children-list.interface';
import { PredefinedTasks } from '../../core/models/predefined-tasks.interface';
import { GeneralService } from '../../core/services/general.service';
import { PredefinedSerService } from '../../core/services/predefined-ser.service';
import { AssignTaskService } from '../../core/services/assign-task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assigntask',
  imports: [SidebarComponent, FormsModule],
  templateUrl: './assigntask.component.html',
  styleUrl: './assigntask.component.css',
})
export class AssigntaskComponent implements OnInit {

  Parents: ParentList[] = [];
  PredeTasks: PredefinedTasks[] = [];
  selectedParent: ParentList | null = null;
  selectedChild: ChildrenList | null = null;
  selectedPredefinedTaskId: number | null = null;
readonly specialistId: string = localStorage.getItem('userId') ?? '';  // api initial response data
  taskTitle: string = '';
  taskDescription: string = '';
  taskDueDate: string = '';
  taskType: string = 'Real-world';

  // ui handling
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  // services injection
  private readonly generalService = inject(GeneralService);
  private readonly predefinedSerService = inject(PredefinedSerService);
  private readonly assignTaskService = inject(AssignTaskService);

  ngOnInit(): void {
    this.getAllGeneralData();
    this.getAllPredefindData();
  }

  getAllGeneralData(): void {
    // ✅ بنستخدم this.specialistId من الـ localStorage مش static '1'
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

  selectPredefinedTask(preTask: PredefinedTasks): void {
    this.taskTitle = preTask.title;
    this.taskDescription = preTask.description;
    this.taskDueDate = '';
    this.selectedPredefinedTaskId = preTask.id;

    const typeMap: { [key: string]: string } = {
      'REALWORLD': 'Real-world',
      'Real-world': 'Real-world',
      'MOBILE': 'Mobile',
      'Mobile': 'Mobile'
    };
    this.taskType = typeMap[preTask.taskType] ?? 'Real-world';
  }

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

const taskData = {
  title: this.taskTitle,
  description: this.taskDescription,
  taskType: this.taskType,
  predefinedTaskId: this.selectedPredefinedTaskId,
  dueDate: this.taskDueDate,
  specialistId: Number(this.specialistId), // ✅ number للـ interface
  childId: this.selectedChild.id as number
};

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.assignTaskService.assignTaskData(taskData).subscribe({
      next: (res) => {
        this.successMessage = `Task assigned to ${this.selectedChild?.name} successfully!`;
        this.isLoading = false;
        this.resetForm();

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Something went wrong. Please try again.';
        this.isLoading = false;
      }
    });
  }

  resetForm(): void {
    this.taskTitle = '';
    this.taskDescription = '';
    this.taskDueDate = '';
    this.taskType = 'Real-world';
    this.selectedPredefinedTaskId = null;
  }
}