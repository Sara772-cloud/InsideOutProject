import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey:            'AIzaSyAQ-svMaThJ7J0msRkZHtuJ3bPQfQTfFQA',
  authDomain:        'insideout-4cd8d-137e2.firebaseapp.com',
  projectId:         'insideout-4cd8d-137e2',
  storageBucket:     'insideout-4cd8d-137e2.firebasestorage.app',
  messagingSenderId: '320761412092',
  appId:             '1:320761412092:web:88f41a010eb8e056845a79',
};

const VAPID_KEY = 'BN8Z3KZsrS5Lz4QwpP82ZfgMEVhoADXnHEgKg3B2PfAQOjG2YLxMk5eEkyrXZDg6LNX9oTsJ6w-2a4f8xj-oG2k';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://insideout.runasp.net';

  private readonly firebaseApp: FirebaseApp =
    getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

  private readonly messaging: Messaging = getMessaging(this.firebaseApp);

  async requestPermissionAndRegister(): Promise<void> {
    try {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        console.warn('🔕 Notification permission denied by user');
        return;
      }

      const token = await getToken(this.messaging, { vapidKey: VAPID_KEY });

      if (token) {
        console.log('🔑 FCM Token:', token);
        this.sendTokenToBackend(token);
      } else {
        console.warn('No FCM token received');
      }
    } catch (err) {
      console.error('❌ Error getting FCM token:', err);
    }
  }

  private sendTokenToBackend(token: string): void {
    const userId = localStorage.getItem('userId');

    this.httpClient
      .post(`${this.baseUrl}/api/Notification/device-token`, {
        userId: Number(userId),
        role: 'Specialist',
        token: token,
        platform: 'web' 
      })
      .subscribe({
        next: () => console.log('✅ Device token registered successfully'),
        error: (err) => console.error('❌ Failed to register token:', err),
      });
  }

listenToForegroundMessages(): void {
  onMessage(this.messaging, (payload) => {
    console.log('📩 Foreground message received:', payload);

    if (payload.notification) {
      // بدل new Notification() استخدمي السطر ده
      navigator.serviceWorker.getRegistration().then(registration => {
        registration?.showNotification(
          payload.notification?.title ?? 'Notification',
          {
            body: payload.notification?.body ?? '',
            icon: '/favicon.ico',
          }
        );
      });
    }
  });
}
}