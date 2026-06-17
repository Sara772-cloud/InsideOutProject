import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('InsideOut');
  private readonly notificationService = inject(NotificationService);

  ngOnInit(): void {
    initFlowbite();

    // ✅ لما الـ App يفتح، اطلب إذن الـ Notifications وسجّل الـ Token
    this.notificationService.requestPermissionAndRegister();

    // ✅ استنى الـ Notifications لما الـ App يكون مفتوح
    this.notificationService.listenToForegroundMessages();
  }
}