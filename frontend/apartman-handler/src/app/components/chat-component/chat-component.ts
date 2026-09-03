import { Component } from '@angular/core';
import { Message } from './message-interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.scss',
})
export class ChatComponent {

  messages: Message[] = [{text: 'hali', isRobot: true}];
  inputText: string = '';

  sendMessage(){
    const trimText = this.inputText.trim();
    if(trimText != ''){
      const message: Message = {text: trimText, isRobot: false};
      this.inputText = '';
      this.messages.push(message);
    }
  }
}
