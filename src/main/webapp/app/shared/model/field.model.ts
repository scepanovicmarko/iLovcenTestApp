import { IPolicy } from 'app/shared/model/policy.model';
import { IFieldGroup } from 'app/shared/model/field-group.model';

export const enum FieldType {
  NUMBER = 'NUMBER',
  TEXT = 'TEXT',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
  LONGTEXT = 'LONGTEXT'
}

export interface IField {
  id?: number;
  name?: string;
  value?: string;
  type?: FieldType;
  policy?: IPolicy;
  fieldGroup?: IFieldGroup;
}

export const defaultValue: Readonly<IField> = {};
