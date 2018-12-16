import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';

// Angular material
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatTabsModule, MatInputModule, MatSelectModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SpeechRecognitionComponent } from './speech-recognition/speech-recognition.component';
import { BrainAIComponent } from './brain-ai/brain-ai.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { HackathonBaseComponent } from './hackathon-base/hackathon-base.component';
import { HackathonService } from './hackathon-base/hackathon-base.service';

// Kendo grid
import { GridModule } from '@progress/kendo-angular-grid';

//Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    SpeechRecognitionComponent,
    BrainAIComponent,
    LoadingIndicatorComponent,
    HackathonBaseComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatCheckboxModule,
    GridModule,
    MatToolbarModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressBarModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HackathonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
