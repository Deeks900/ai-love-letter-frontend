import { Component } from '@angular/core';
import { Letter } from '../services/letter';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AfterViewInit } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
// Form fields
  senderName = '';
  receiverName = '';
  relationship = '';
  tone = 'romantic';
  emotion = 70;
  language = 'en';
  letter = '';
  loading = false;

  constructor(private letterService: Letter) {}

  closePopup() { this.letter = ''; }

  copyLetter() { navigator.clipboard.writeText(this.letter).then(() => alert('Copied! 💖')); }

  getEmotionColor(): string {
    if(this.emotion < 40) return '#ffb6c1';
    if(this.emotion < 70) return '#ff4d6d';
    return '#ff1a50';
  }

generateLetter() {
  const payload = {
    sender_name: this.senderName,
    receiver_name: this.receiverName,
    relationship: this.relationship,
    tone: this.tone,
    emotion_level: this.emotion,
    language: this.language
  };

  this.loading = true;
  this.letter = ''; // clear previous

  this.letterService.generateLetter(payload)
    .subscribe({
      next: res => {
        this.letter = res.letter;
        this.loading = false;
      },
      error: err => {
        alert('Error generating letter!');
        this.loading = false;
      }
    });
}

}
