import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  users: any[] = [];
  selectedUser: any;
  messages: any[] = [];
  newMessage: string = '';

  constructor(private http: HttpClient, private chatService: ChatService) {}

  ngOnInit() {

    const userName = localStorage.getItem('userName');

    if (userName) {
      // Join the chat room with the user's name
      this.chatService.joinChat(userName);

      this.fetchUsersByName(userName);

      // Listen for new messages
      this.chatService.getNewMessages().subscribe((message) => {
        this.messages.push(message);
      });
    }
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.messages = []; 

    // Fetch the messages for the selected user
    this.chatService.getMessages(this.selectedUser._id).subscribe((messages) => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.selectedUser && this.newMessage.trim() !== '') {
      // Get the logged-in user's name from local storage
      const userName = localStorage.getItem('userName');

      if (userName) {
        // Send the new message
        this.chatService.sendMessage(userName, this.selectedUser._id, this.newMessage);
        this.newMessage = ''; // Clear the input field
      }
    }
  }

  fetchUsersByName(name: string) {
    const url = `http://localhost:5000/api/users?name=${name}`;
    this.http.get<any[]>(url).subscribe((users) => {
      this.users = users;
    });}

}

