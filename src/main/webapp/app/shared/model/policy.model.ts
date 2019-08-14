import { IFieldGroup } from 'app/shared/model/field-group.model';
import { IField } from 'app/shared/model/field.model';

export interface IPolicy {
  id?: number;
  name?: string;
  fieldGroups?: IFieldGroup[];
  fields?: IField[];
}

export const defaultValue: Readonly<IPolicy> = {};
