import { Pipe, PipeTransform } from '@angular/core';
import { Interview } from 'src/app/core/data/models/interview.model';
import { result } from 'cypress/types/lodash';

@Pipe({
  name: 'interviewByFacCrit',
})
export class InterviewByFacCritPipe implements PipeTransform {
  transform(interviews: Interview[], facCritId: string): Interview[] {
    const result = interviews?.filter(
      x => x.facCrits.findIndex(x => x.id === facCritId || x.referenceId === facCritId) != -1,
    );

    return result?.length == 0 ? null : result;
  }
}