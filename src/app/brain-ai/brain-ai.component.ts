import { Component, OnInit, Input } from '@angular/core';

import * as brain from '../../assets/brain.js';



@Component({
  selector: 'app-brain-ai',
  templateUrl: './brain-ai.component.html',
  styleUrls: ['./brain-ai.component.css']
})
export class BrainAIComponent implements OnInit {
  Sex: Sex[] = [
    { value: 1, viewValue: 'Male' },
    { value: 2, viewValue: 'Female' }
  ];
  @Input() PatData: PatientData[];
  data: AIIO[];
  age: number;
  bmi: number;
  sexOP: number;
  public loadIndiactor: boolean = false;
  public learnedData: any;
  net: brain.NeuralNetwork;
  probability: number;
  OpNet: number;
  colorPro: string;

  constructor() {
    this.data = new Array<AIIO>();
  }

  ngOnInit() { }

  ConstructData() {

    this.data = new Array<AIIO>();
    this.PatData.forEach(dt => {
      this.data.push({
        input: [dt.Sex, dt.Age, dt.BMI],
        output: [dt.Diabetics]
      })
    })
  }

  downLoadFile() {
    const type = 'text/csv';
    const blob = new Blob([JSON.stringify(this.net)], {
      type: type.toString()
    });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  neuralLearnInit() {
    this.ConstructData();
    this.loadIndiactor = true;
    const config = {
      iterations: 1000, // the maximum times to iterate the training data --> number greater than 0
      errorThresh: 0.005, // the acceptable error percentage from training data --> number between 0 and 1
      log: false, // true to use console.log, when a function is supplied it is used --> Either true or a function
      logPeriod: 10, // iterations between logging out --> number greater than 0
      learningRate: 0.3, // scales with delta to effect training rate --> number between 0 and 1
      momentum: 0.1, // scales with next layer's change value --> number between 0 and 1
      callback: null, // a periodic call back that can be triggered while training --> null or function
      callbackPeriod: 10, // the number of iterations through the training data between callback calls --> number greater than 0
      timeout: Infinity // the max number of milliseconds to train for --> number greater than 0
    };
    this.net = new brain.NeuralNetwork();

    this.net.trainAsync(this.data, config).then(res => {
      console.log(this.net.run([1, 5, 21]));
      // this.downLoadFile();
      this.loadIndiactor = false;
    });
  }

  public predictValues() {
    this.age = +this.age;
    this.bmi = +this.bmi;
    this.OpNet = this.net.run([this.sexOP, this.age, this.bmi]);
    this.probability = Math.round((this.net.run([this.sexOP, this.age, this.bmi]) * 100));
    if (this.probability > 50 && this.probability < 80)
      this.colorPro = 'accent';
    if (this.probability > 80)
      this.colorPro = 'warn';
    if (this.probability < 50)
      this.colorPro = 'primary';

  }

}


class PatientData {
  Age: number;
  BMI: number;
  Diabetics: number;
  FirstName: string;
  LastName: string;
  Sex: number;
}

class AIIO {
  input: number[];
  output: number[];
}

class Sex {
  value: number;
  viewValue: string;
}
