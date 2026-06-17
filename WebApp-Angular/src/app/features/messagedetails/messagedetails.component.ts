import { Component, OnInit, OnDestroy, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ChatService } from '../../core/services/chat.service';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'app-messagedetails',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './messagedetails.component.html',
  styleUrl: './messagedetails.component.css',
})
export class MessagedetailsComponent implements OnInit, OnDestroy {
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  private readonly chatService    = inject(ChatService);
  private readonly settingsService = inject(SettingsService);
  private readonly http            = inject(HttpClient);

  private readonly BASE_URL = 'https://clambake-fanning-java.ngrok-free.dev/api';
  private readonly HANDLER_ID = 'chat_handler';

  // State
  messages: any[]  = [];
  newMessage       = '';
  isConnecting     = true;
  isSending        = false;
  errorMsg         = '';
  channel: any     = null;

  // User info
  specialistId   = localStorage.getItem('userId')     ?? '';
  specialistName = 'Specialist';
  channelUrl     = '';
  parentName     = localStorage.getItem('parentName') ?? 'Parent';

  ngOnInit(): void {
    const id = localStorage.getItem('userId') ?? '';
    this.settingsService.getSpecialistById(id).subscribe({
      next: (res) => { this.specialistName = res.name; }
    });
    this.initChat();
  }

  ngOnDestroy(): void {
    this.chatService.removeMessageListener(this.HANDLER_ID);
  }

  async initChat(): Promise<void> {
    try {
      this.isConnecting = true;
      this.errorMsg     = '';

      const parentId = localStorage.getItem('parentId') ?? '';

      // 1. جيب الـ channelUrl من الـ backend
      const res = await this.http.post<{ success: boolean; channelUrl: string }>(
        `${this.BASE_URL}/Chat/create-chat?parentId=${parentId}&specialistId=${this.specialistId}`,
        {}
      ).toPromise();

      this.channelUrl = res?.channelUrl ?? '';

      // 2. Connect to Sendbird
await this.chatService.connectUser(`specialist_${this.specialistId}`, this.specialistName);      // 3. Join channel
      this.channel = await this.chatService.getChannel(this.channelUrl);

      // 4. Load previous messages
      this.messages = await this.chatService.loadMessages(this.channel);

      // 5. Listen for real-time messages
      this.chatService.addMessageListener(this.HANDLER_ID, (msg) => {
        this.messages.push(msg);
        this.scrollToBottom();
      });

      this.isConnecting = false;
      this.scrollToBottom();

    } catch (error) {
      console.error('Chat init error:', error);
      this.errorMsg = 'Failed to connect to chat. Please try again.';
      this.isConnecting = false;
    }
  }

  async sendMessage(): Promise<void> {
    if (!this.newMessage.trim() || !this.channel || this.isSending) return;

    const text     = this.newMessage.trim();
    this.newMessage = '';
    this.isSending  = true;

    try {
      const msg = await this.chatService.sendMessage(this.channel, text);
      this.messages.push(msg);
      this.scrollToBottom();
    } catch (error) {
      console.error('Send error:', error);
      this.errorMsg = 'Failed to send message.';
    } finally {
      this.isSending = false;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

isMyMessage(msg: any): boolean {
  return msg.sender?.userId === `specialist_${this.specialistId}`;
}

  formatTime(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getInitials(name: string): string {
    const cleanName = name?.replace(/^DR\s*/i, '') ?? '';
    return cleanName.slice(0, 2).toUpperCase();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}