import { IPolicy } from 'app/shared/model/policy.model';
import { IField } from 'app/shared/model/field.model';

export interface IFieldGroup {
  id?: number;
  name?: string;
  value?: string;
  policy?: IPolicy;
  fields?: IField[];
}

export const defaultValue: Readonly<IFieldGroup> = {};
