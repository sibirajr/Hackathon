import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.css']
})
export class SpeechRecognitionComponent implements OnInit {
  private recognition: any;
  @Output() convertedText: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit() {
    this.initSpeechReg();
  }

  private initSpeechReg() {
    try {
      const SpeechRecognition =
        (<any>window).SpeechRecognition ||
        (<any>window).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.onresult = function(event) {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        const mobileRepeatBug =
          current === 1 && transcript === event.results[0][0].transcript;

        if (!mobileRepeatBug) {
          this.convertedText.emit(transcript);
        }
      }.bind(this);
    } catch (e) {
      console.error(e);
    }
  }

  private recordVoice() {
    this.recognition.start();
  }
}
