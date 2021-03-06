import { FacCrit } from '../../data/models/faccrit.model';
import { ContactPerson } from '../../data/models/contact-person.model';
import { AuditStatus } from '../../data/models/audit.model';

export interface AuditDto {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  creationDate: string;
  status: AuditStatus;
  scope: FacCrit[];
  contactPersons: ContactPerson[];
  cancellationDate: string;
  cancellationReason: string;
  cancellationContactPerson: ContactPerson;
}
