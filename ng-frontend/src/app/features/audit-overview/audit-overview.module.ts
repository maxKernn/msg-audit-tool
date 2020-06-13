import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditOverviewRoutingModule } from './audit-overview-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuditOverviewComponent } from './components/audit-overview/audit-overview.component';
import { InterviewCardComponent } from './components/audit-overview/interview-list/interview-card/interview-card.component';
import { NewInterviewDialogComponent } from '../../shared/components/dialogs/new-interview-dialog/new-interview-dialog.component';
import { InterviewFormComponent } from '../../shared/components/forms/interview-form/interview-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InterviewListComponent } from './components/audit-overview/interview-list/interview-list.component';
import { AuditInfoComponent } from './components/audit-overview/audit-info/audit-info.component';
import { FactorsInScopePipe } from './components/audit-overview/interview-list/factorsInScope.pipe';
import { FacCritByFactorPipe } from './components/audit-overview/interview-list/facCritByFactor.pipe';
import { InterviewByFacCritPipe } from './components/audit-overview/interview-list/interviewByFacCrit.pipe';

@NgModule({
  declarations: [
    AuditOverviewComponent,
    InterviewCardComponent,
    AuditInfoComponent,
    NewInterviewDialogComponent,
    FactorsInScopePipe,
    FacCritByFactorPipe,
    InterviewByFacCritPipe,
    InterviewFormComponent,
    InterviewListComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AuditOverviewRoutingModule, SharedModule],
})
export class AuditOverviewModule {}
