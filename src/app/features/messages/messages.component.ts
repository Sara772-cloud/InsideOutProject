import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ChatService } from '../../core/services/chat.service';
import { GeneralService } from '../../core/services/general.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  private chatService = inject(ChatService);
  private generalService = inject(GeneralService);
  private router = inject(Router);

  specialistId = localStorage.getItem('userId') ?? '';
  parents: any[] = [];
  filteredParents: any[] = [];
  searchQuery = '';
  isLoading = true;

  ngOnInit(): void {
    this.loadParents();
  }

  loadParents(): void {
    this.generalService.getGeneralData(this.specialistId).subscribe({
      next: (res) => {
        this.parents = res;
        this.filteredParents = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredParents = this.parents.filter(p =>
      p.name?.toLowerCase().includes(q) ||
      p.children?.some((c: any) => c.name?.toLowerCase().includes(q))
    );
  }

  getFirstChildName(parent: any): string {
    return parent.children?.[0]?.name ?? '';
  }

  getInitials(name: string): string {
    return name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() ?? '??';
  }

  openChat(parent: any): void {
    this.chatService.createChat(parent.id, Number(this.specialistId)).subscribe({
      next: (res) => {
        if (res.success) {
          localStorage.setItem('channelUrl', res.channelUrl);
          localStorage.setItem('parentName', parent.name);
          localStorage.setItem('parentId', parent.id.toString());
          // ✅ الـ route الصح
          this.router.navigate(['/messages/messagesdetails']);
        }
      },
      error: (err) => {
        console.error('Failed to create chat:', err);
      }
    });
  }
}