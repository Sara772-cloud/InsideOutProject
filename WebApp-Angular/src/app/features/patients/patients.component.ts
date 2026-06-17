import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { Router, RouterLink } from "@angular/router";
import { ParentList } from '../../core/models/parent-list.interface';
import { GeneralService } from '../../core/services/general.service';

@Component({
    selector: 'app-patients',
    imports: [SidebarComponent, RouterLink],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.css',
})
export class PatientsComponent implements OnInit {
    Parents:ParentList[]=[]

    // TODO: injection to el service el general.
    private readonly generalService=inject(GeneralService);
    // TODO: call api in OnInit()
    ngOnInit(): void {
        this.getAllGeneralData()
    }
    // ToDo: get el api data
    getAllGeneralData():void{
        const specialistId = localStorage.getItem('userId') ?? '';
        this.generalService.getGeneralData(specialistId).subscribe({
            next:(res)=>{
                // console.log(res);
                this.Parents=res;
                
            },
            error:(err)=>{
                console.log(err);
            }
        })

    }
constructor(private router:Router){}

// ** track progress function logic==>" ma3nah eno lma a call el function de aro7 ll path da w a7ot el childId da wrah fl url"

trackProgress(childId:number){
    this.router.navigate(['/patients/patientsdetails',childId])

}


}
