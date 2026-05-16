import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { SpecialistInfoService } from '../../../core/services/specialist-info.service';
import { Settings } from '../../../core/models/settings.interface';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
    ReSettings!:Settings;
    private specialistInfoService =inject(SpecialistInfoService);
    ngOnInit(): void {
      this.getAllSpecialistData();
      
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
}
