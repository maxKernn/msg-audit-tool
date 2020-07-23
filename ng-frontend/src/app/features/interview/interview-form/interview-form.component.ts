import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Interview, InterviewStatus } from 'src/app/core/data/models/interview.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { ContactPerson } from 'src/app/core/data/models/contact-person.model';
import { FacCrit } from 'src/app/core/data/models/faccrit.model';
import { AbstractFormComponent } from '../../../shared/components/forms/abstract-form-component';
import { map, filter } from 'rxjs/operators';
import { ContactPersonStore } from 'src/app/core/data/stores/contact-person.store';

interface SelectedContactPerson {
  name: string;
  company: string;
  value: ContactPerson;
}

@Component({
  selector: 'app-interview-form',
  templateUrl: './interview-form.component.html',
  styleUrls: ['./interview-form.component.scss'],
})
export class InterviewFormComponent extends AbstractFormComponent implements OnInit {
  @Input() interview: Interview;
  @Input() scope: FacCrit[];
  @Output() formSubmitted = new EventEmitter<{ interview: Interview; scope: FacCrit[] }>();

  facCritSelected = false;

  contactPersons: ContactPerson[];
  selectedContactPersons: SelectedContactPerson[] = [];

  constructor(private fb: FormBuilder, protected dialogService: NbDialogService) {
    super(dialogService);
  }

  get startDate() {
    return this.formGroup.get('startDate');
  }

  get facCrit() {
    return this.formGroup.get('facCrit');
  }

  ngOnInit() {
    this.selectedContactPersons =
      this.interview?.contactPersons?.map(cp => ({
        company: cp.companyName,
        name: cp.forename + ' ' + cp.surname,
        value: cp,
      })) ?? [];

    this.formGroup = this.fb.group({
      startDate: [this.interview?.startDate ?? new Date()],
    });

    for (const facCrit of this.scope) {
      this.formGroup.addControl(String(facCrit.id), new FormControl(false));
    }

    this.formGroup.valueChanges.subscribe(() => {
      for (const facCrit of this.scope) {
        if (this.formGroup.get(String(facCrit.id)).value === true) {
          return (this.facCritSelected = true);
        }
      }

      return (this.facCritSelected = false);
    });
  }

  checkedFacCrits() {
    const result: FacCrit[] = [];

    for (const crit of this.scope) {
      const checked = this.formGroup.get(String(crit.id)).value;

      if (checked) {
        result.push(crit);
      }
    }

    return result;
  }

  onSubmit() {
    const interview: Interview = {
      startDate: this.startDate.value,
      status: InterviewStatus.Active,
      contactPersons: this.selectedContactPersons.map(cp => cp.value),
    };
    this.formSubmitted.emit({ interview, scope: this.checkedFacCrits() });
  }

  toggleCriteriaChecked(factorId: string, checked: true) {
    const criteria = this.scope.filter(x => x.referenceId === +factorId);

    for (const crit of criteria) {
      this.formGroup.get(String(crit.id))?.setValue(checked);
    }
  }

  onContactPersonSelected(cp: ContactPerson) {
    if (this.selectedContactPersons.map(x => x.value).find(y => y.id === cp.id)) return;

    this.selectedContactPersons.push({
      company: cp.companyName,
      name: cp.forename + ' ' + cp.surname,
      value: cp,
    });
  }

  onRemoveContactPerson(cp: SelectedContactPerson) {
    const indexOf = this.selectedContactPersons.indexOf(cp);
    this.selectedContactPersons.splice(indexOf, 1);
  }
}
