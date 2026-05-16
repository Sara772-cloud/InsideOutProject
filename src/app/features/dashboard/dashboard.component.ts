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
export class DashboardComponent implements OnInit{

// ? el general endpoint response.
    Parents:ParentList[]=[]
    SPAllTasksCount!:AllAssigedSpecialistTasks;
    ReSettings!:Settings;
    
    private generalService =inject(GeneralService);
    private allTasksCountService =inject(AllTasksCountService);
    private specialistInfoService =inject(SpecialistInfoService);
    ngOnInit(): void {
        this.getAllGeneralData();
        this.getAllTasksCountData();
        this.getAllSpecialistData();
    }
    getAllGeneralData():void{
    const specialistId = localStorage.getItem('userId') ?? '';
    this.generalService.getGeneralData(specialistId).subscribe({
        next:(res)=>{
            console.log(res);
            this.Parents=res;
        },
        error:(err)=>{
            console.log(err);
            
        }
    })

    }

    getAllTasksCountData():void{
    const specialistId =localStorage.getItem('userId') ?? '';
    this.allTasksCountService.getAllTasksCount(specialistId).subscribe({
        next:(res)=>{
            console.log(res);
            this.SPAllTasksCount=res;
        },
        error:(err)=>{
            console.log(err);
        },

    })

    }
    getAllSpecialistData():void{
    const specialistId = localStorage.getItem('userId') ?? '';
    this.specialistInfoService.getAllSpecialistInfo(specialistId).subscribe({
        next:(res)=>{
        console.log(res);
        this.ReSettings=res;
        },
        error:(err)=>{
        console.log(err);
        
        }
    })

    }

// ? endpoint el assinged tasks for each specialist





// !!!el function de el flatMap bta5od kol el arrays el soghayra w 
// !! te gma3hom fe array wahda kbera w mn el array de
// !! b2a a2dr a5od first 5 childs elli ana 3yzahom 

get first4Children():ChildrenList[]{
    return this.Parents.flatMap(p => p.children).slice(0, 4);
}


// ToDo: get property  3lshan t return all childrens 'patients' count.
get activePatientsCount():number{
    return this.Parents.flatMap((p)=>p.children).length;
}


// !!! 3lshan n3rd el task ell el due date bt3ha elnaharda bas
// ana hena bageb today's date mn 'new Date()' w ba3d keda b7awlo to string.
today:string = new Date().toDateString();

/*
    1. mn el general response ana ba rg3ha kolha.
    2. ba select mn el general endpoint de el children arrays
    w ba group them all 'in one array' by using el flatMap. 
    3. bsta5dm el flatMap 3lshan agroup kol el arrays of tasks,
    bas ana bzawed 3leha el childName mn el chidren array
    3lshan azawedo bsta5dm el map w ba5od copyyyy mn el object ba3 
    el taks with[...t] spread operator da by copy kol 7aga gowa el t,
    4. ba compare el today's date bl due date w ba return el true

 */
// ? e7na hena el return type msh kda TodayTask[]|null l2n el filter btReturn [] lw hya empty.
get todayTasks():TodayTask[] {
  return this.Parents // 1
    .flatMap(p => p.children)// 2
    .flatMap(c => c.tasks.map(t => ({ ...t, childName: c.name }))) //3
    .filter(t => new Date(t.dueDate).toDateString() === this.today); //4
}

selectedTask: null | TodayTask = null;


/**  
    hena ana ba5od copy mn el task properties w ba add property el 
    dueDate bl format elli yzhar ll user fl ui
    el date fl response[string] ==> converted to [date object] by new Date
    ==> converted to custom  formated date by [toLocaleDateString()]
*/
openModal(task:TodayTask):void {
    this.selectedTask = {
    ...task,
    dueDate: new Date(task.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    };
}

closeModal():void {
    this.selectedTask = null;
}




}



