import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  constructor() {
    // Connect to the Socket.IO server
    this.socket = io('http://localhost:5000');
  }

  joinChat(username: string) {
    // Emit the joinChat event to the server
    this.socket.emit('joinChat', username);
  }

  getUsers(): Observable<any[]> {
    // Return an observable that listens for the users event
    return new Observable((observer) => {
      this.socket.on('users', (users) => {
        observer.next(users);
      });
    });
  }

  getMessages(receiverId: string): Observable<any[]> {
    // Return an observable that listens for the messages event
    return new Observable((observer) => {
      this.socket.on('messages', (messages) => {
        observer.next(messages);
      });
    });
  }

  sendMessage(sender: string, receiverId: string, content: string) {
    // Emit the sendMessage event to the server
    this.socket.emit('sendMessage', { sender, receiverId, content });
  }

  getNewMessages(): Observable<any> {
    // Return an observable that listens for the newMessage event
    return new Observable((observer) => {
      this.socket.on('newMessage', (message) => {
        observer.next(message);
      });
    });
  }
}
