import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HackathonService } from './hackathon-base.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-hackathon-base',
  templateUrl: './hackathon-base.component.html',
  styleUrls: ['./hackathon-base.component.css']
})
export class HackathonBaseComponent implements OnInit {
  PatientsWhole: PatientData[];
  PatientsWholePer: PatientData[];
  public PatientsObs: Observable<any[]>;
  PatSearch: string;
  fname: string;
  lname: string;
  sexf: number;
  agef: number;
  Sex: Sex[] = [
    { value: 1, viewValue: 'Male' },
    { value: 2, viewValue: 'Female' }
  ];
  public gridView: GridDataResult;
  public pageSize = 9;
  public skip = 0;

  constructor(public hackathonSer: HackathonService, public db: AngularFirestore) {
      this.PatientsWhole = new Array<PatientData>();
      this.loadItems();

  }

  ngOnInit() {
    this.SearchPatient();

  }

  public audioToText(text: string) {
    this.ASeach(text);
  }

  private ASeach(text: string) {
    let firstname: string;
    let lastname: string
    let sex: string;
    this.PatSearch = '';
    this.PatientsWhole = this.PatientsWholePer;
    this.PatSearch = text.toLocaleLowerCase();
    if (this.PatSearch.includes('patient')) {
      firstname = this.PatSearch.split(' ', 4)[2];
      lastname = this.PatSearch.split(' ', 4)[3];
      let InterPat = this.PatientsWhole.filter(pat =>
        pat.FirstName.toLocaleLowerCase() == firstname && pat.LastName.toLocaleLowerCase() == lastname
      );
      this.PatientsWhole = new Array<PatientData>();
      this.PatientsWhole = InterPat;
      this.loadItems();
    }
    if (this.PatSearch.includes('records')) {
      sex = this.PatSearch.split(' ', 3)[1];
      if (sex == 'male' || sex == 'female') {
        let InterPat = this.PatientsWhole.filter(pat =>
          pat.SexDes.toLocaleLowerCase() == sex
        );
        this.PatientsWhole = InterPat;
        this.loadItems();
      }
    }
  }

  public SearchPatient() {
    this.PatientsObs = this.db.collection('/Patient').valueChanges();
    this.PatientsObs.subscribe(res => {
      this.PatientsWhole = res;
      this.PatientsWhole.forEach(x => {
        if (x.Sex == 1) {
          x.SexDes = 'Male';
        }
        if (x.Sex == 2) {
          x.SexDes = 'Female';
        }
      });
      this.PatientsWholePer = this.PatientsWhole;
      this.loadItems();
    });
  }

  public FilterPatient() {
    this.PatientsWhole = this.PatientsWholePer;
    if (this.fname)
      this.PatientsWhole = this.PatientsWhole.filter(x => x.FirstName.toLocaleLowerCase() == this.fname.toLocaleLowerCase());
    if (this.lname)
      this.PatientsWhole = this.PatientsWhole.filter(x => x.LastName.toLocaleLowerCase() == this.lname.toLocaleLowerCase());
    if (this.sexf)
      this.PatientsWhole = this.PatientsWhole.filter(x => x.Sex == this.sexf);
    if (this.agef)
        this.PatientsWhole = this.PatientsWhole.filter(x => x.Age == this.agef);
    this.loadItems();
  }

  public PatNSearch() {

  }
  public pageChange(event: PageChangeEvent): void {
      this.skip = event.skip;
      this.loadItems();
  }

  private loadItems(): void {
      this.gridView = {
          data: this.PatientsWhole.slice(this.skip, this.skip + this.pageSize),
          total: this.PatientsWhole.length
      };
  }

}

class PatientData {
  Age: number
  BMI: number
  Diabetics: number;
  FirstName: string
  LastName: string
  SexDes: string
  Sex: number;
}

class Sex {
  value: number;
  viewValue: string;
}
