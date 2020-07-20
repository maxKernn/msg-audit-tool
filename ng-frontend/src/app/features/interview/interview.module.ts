import { NgModule } from '@angular/core';

import { InterviewRoutingModule } from './interview-routing.module';
import { InterviewComponent } from './interview.component';
import { AnswerQuestionListComponent } from './answer-question-list/answer-question-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionByIdPipe } from './answer-question-list/questions-by-id.pipe';
import { AnswersByFacCritId } from './answers-by-faccrit-id.pipe';
import { AddInterviewDialogComponent } from './add-interview-dialog/add-interview-dialog.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';

@NgModule({
  declarations: [
    InterviewComponent,
    AnswerQuestionListComponent,
    QuestionByIdPipe,
    AnswersByFacCritId,
    InterviewFormComponent,
    AddInterviewDialogComponent,
  ],
  imports: [ReactiveFormsModule, SharedModule, InterviewRoutingModule],
})
export class InterviewModule {}
