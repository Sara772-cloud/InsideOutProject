import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { RouterLink } from "@angular/router";
import { ParentList } from '../../core/models/parent-list.interface';
import { ChildrenList } from '../../core/models/children-list.interface';
import { AllAssigedSpecialistTasks } from '../../core/models/all-assiged-specialist-tasks.interface';
import { TasksList } from '../../core/models/tasks-list.interface';
import { GeneralService } from '../../core/services/general.service';
import { AllTasksCountService } from '../../core/services/all-tasks-count.service';
import { SpecialistInfoService } from '../../core/services/specialist-info.service';
import { Settings } from '../../core/models/settings.interface';

// local interface 
interface TodayTask extends TasksList {
    childName: string;
}

@Component({
    selector: 'app-dashboard',
    imports: [SidebarComponent, RouterLink],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

    // ✅ FIX: initialize بـ {} as Type بدل ! عشان متبقاش undefined
    Parents: ParentList[] = [];
    SPAllTasksCount: AllAssigedSpecialistTasks = {} as AllAssigedSpecialistTasks;
    ReSettings: Settings = {} as Settings;

    private generalService = inject(GeneralService);
    private allTasksCountService = inject(AllTasksCountService);
    private specialistInfoService = inject(SpecialistInfoService);

    ngOnInit(): void {
        this.getAllGeneralData();
        this.getAllTasksCountData();
        this.getAllSpecialistData();
    }

    getAllGeneralData(): void {
        const specialistId = localStorage.getItem('userId') ?? '';
        this.generalService.getGeneralData(specialistId).subscribe({
            next: (res) => {
                console.log(res);
                this.Parents = res;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    getAllTasksCountData(): void {
        const specialistId = localStorage.getItem('userId') ?? '';
        this.allTasksCountService.getAllTasksCount(specialistId).subscribe({
            next: (res) => {
                console.log(res);
                this.SPAllTasksCount = res;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    getAllSpecialistData(): void {
        const specialistId = localStorage.getItem('userId') ?? '';
        this.specialistInfoService.getAllSpecialistInfo(specialistId).subscribe({
            next: (res) => {
                console.log(res);
                this.ReSettings = res;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    // flatMap بتاخد كل arrays الـ children وتجمعهم في array واحدة
    // وبعدين slice(0, 4) بتاخد أول 4 بس
    get first4Children(): ChildrenList[] {
        return this.Parents.flatMap(p => p.children).slice(0, 4);
    }

    // بترجع عدد كل الـ children (patients) الكلي
    get activePatientsCount(): number {
        return this.Parents.flatMap((p) => p.children).length;
    }

    today: string = new Date().toDateString();

    get todayTasks(): TodayTask[] {
        return this.Parents
            .flatMap(p => p.children)
            .flatMap(c => c.tasks.map(t => ({ ...t, childName: c.name })))
            .filter(t => new Date(t.dueDate).toDateString() === this.today);
    }

    selectedTask: null | TodayTask = null;

    openModal(task: TodayTask): void {
        this.selectedTask = {
            ...task,
            dueDate: new Date(task.dueDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };
    }

    closeModal(): void {
        this.selectedTask = null;
    }
}