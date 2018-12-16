import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HackathonBaseComponent } from '../hackathon-base/hackathon-base.component';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';

const routes: Routes = [
  {
    path: '',
    component: HackathonBaseComponent,
  },
  {
    path: 'Load',
    component: LoadingIndicatorComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }