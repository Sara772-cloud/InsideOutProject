import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ParentList } from '../../core/models/parent-list.interface';
import { GeneralService } from '../../core/services/general.service';

@Component({
  selector: 'app-patientdetails',
  imports: [SidebarComponent, RouterLink],
  templateUrl: './patientdetails.component.html',
  styleUrl: './patientdetails.component.css',
})
export class PatientdetailsComponent implements OnInit {

  Parents:ParentList[]=[]

childId!:number;
selectedChild:any;
completedTasks:number=0;
totalAssignedTasks:number=0;
progressPercent: number = 0;

//* function injection
private readonly generalService=inject(GeneralService);

getAllGeneralData(): void {
const specialistId = localStorage.getItem('userId') ?? '';
this.generalService.getGeneralData(specialistId).subscribe({
    next: (res) => {
    // ! hna keda etmna enna 7mlna el response el2wl
    this.Parents = res;
    
    this.childId = +this.route.snapshot.paramMap.get('id')!;
    for (let parent of this.Parents) {
        const found = parent.children.find(c => c.id === this.childId);
        if (found) {
        this.selectedChild = found;
        this.totalAssignedTasks = found.tasks.length;
        this.completedTasks = found.tasks.filter(t => t.taskStatus === 'Completed').length;
        this.progressPercent = this.totalAssignedTasks > 0 
            ? (this.completedTasks / this.totalAssignedTasks) * 100 
            : 0;
        break;
        }
    }
    },
    error: (err) => console.log(err)
});
}

ngOnInit(): void {
    this.getAllGeneralData(); 
}




/*

  ? ana hena b2ol eni h7tag el ActivatedRoute 3lshan hsta5dmha fl ngOnInit() !! wl angular msh hadeni el ActivatedRoute gher lma atlobha fl 'constractor'.
  * 3lshan a read el data elli mawgoda fl url w a3ml access leha zy ma ha access el id

*/ 
constructor(private route: ActivatedRoute) {}








}
