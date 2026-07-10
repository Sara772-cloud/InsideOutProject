import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import SendBird from 'sendbird';

export interface CreateChatResponse {
  success: boolean;
  channelUrl: string;
}

export interface ChatMessage {
  messageId: number;
  message: string;
  sender: {
    userId: string;
    nickname: string;
  };
  createdAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly BASE_URL = 'http://insideout.runasp.net/api';
  private readonly SENDBIRD_APP_ID = 'DA80361B-5BD9-4C6E-8D79-00319DD73F05';
  private readonly headers = { 'ngrok-skip-browser-warning': 'true' };

  private sb: any;
  private currentChannel: any = null;

  constructor(private http: HttpClient) {
    this.sb = new SendBird({ appId: this.SENDBIRD_APP_ID });
  }

  // ─── 1. Create chat channel between specialist and parent ─────────────────
  createChat(parentId: number, specialistId: number): Observable<CreateChatResponse> {
    return this.http.post<CreateChatResponse>(
      `${this.BASE_URL}/Chat/create-chat?parentId=${parentId}&specialistId=${specialistId}`,
      {},
      { headers: this.headers }
    );
  }

  // ─── 2. Sync users with Sendbird ──────────────────────────────────────────
  syncUsers(): Observable<any> {
    return this.http.post(`${this.BASE_URL}/Chat/sync-users`, {}, { headers: this.headers });
  }

  // ─── 3. Connect user to Sendbird ──────────────────────────────────────────
  connectUser(userId: string, nickname: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sb.connect(userId, (user: any, error: any) => {
        if (error) {
          reject(error);
          return;
        }
        // Update nickname
        this.sb.updateCurrentUserInfo(nickname, null, (updatedUser: any, err: any) => {
          if (err) reject(err);
          else resolve(updatedUser);
        });
      });
    });
  }

  // ─── 4. Join/Get channel ──────────────────────────────────────────────────
  getChannel(channelUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sb.GroupChannel.getChannel(channelUrl, (channel: any, error: any) => {
        if (error) reject(error);
        else {
          this.currentChannel = channel;
          resolve(channel);
        }
      });
    });
  }

  // ─── 5. Load previous messages ────────────────────────────────────────────
  loadMessages(channel: any): Promise<ChatMessage[]> {
    return new Promise((resolve, reject) => {
      const query = channel.createPreviousMessageListQuery();
      query.limit = 50;
      query.reverse = false;
      query.load((messages: any[], error: any) => {
        if (error) reject(error);
        else resolve(messages);
      });
    });
  }

  // ─── 6. Send message ─────────────────────────────────────────────────────
  sendMessage(channel: any, text: string): Promise<ChatMessage> {
    return new Promise((resolve, reject) => {
      channel.sendUserMessage(text, (message: any, error: any) => {
        if (error) reject(error);
        else resolve(message);
      });
    });
  }

  // ─── 7. Listen for real-time messages ─────────────────────────────────────
  addMessageListener(handlerId: string, onMessage: (message: ChatMessage) => void): void {
    const handler = new this.sb.ChannelHandler();
    handler.onMessageReceived = (_channel: any, message: any) => {
      onMessage(message);
    };
    this.sb.addChannelHandler(handlerId, handler);
  }

  // ─── 8. Remove listener ───────────────────────────────────────────────────
  removeMessageListener(handlerId: string): void {
    this.sb.removeChannelHandler(handlerId);
  }

  // ─── 9. Disconnect ────────────────────────────────────────────────────────
  disconnect(): void {
    this.sb.disconnect(() => {});
  }

  getCurrentChannel(): any {
    return this.currentChannel;
  }
}