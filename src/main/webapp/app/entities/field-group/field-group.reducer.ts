import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFieldGroup, defaultValue } from 'app/shared/model/field-group.model';

export const ACTION_TYPES = {
  FETCH_FIELDGROUP_LIST: 'fieldGroup/FETCH_FIELDGROUP_LIST',
  FETCH_FIELDGROUP: 'fieldGroup/FETCH_FIELDGROUP',
  CREATE_FIELDGROUP: 'fieldGroup/CREATE_FIELDGROUP',
  UPDATE_FIELDGROUP: 'fieldGroup/UPDATE_FIELDGROUP',
  DELETE_FIELDGROUP: 'fieldGroup/DELETE_FIELDGROUP',
  RESET: 'fieldGroup/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFieldGroup>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FieldGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: FieldGroupState = initialState, action): FieldGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FIELDGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FIELDGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FIELDGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_FIELDGROUP):
    case REQUEST(ACTION_TYPES.DELETE_FIELDGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FIELDGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FIELDGROUP):
    case FAILURE(ACTION_TYPES.CREATE_FIELDGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_FIELDGROUP):
    case FAILURE(ACTION_TYPES.DELETE_FIELDGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FIELDGROUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FIELDGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FIELDGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_FIELDGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FIELDGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/field-groups';

// Actions

export const getEntities: ICrudGetAllAction<IFieldGroup> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FIELDGROUP_LIST,
  payload: axios.get<IFieldGroup>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFieldGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FIELDGROUP,
    payload: axios.get<IFieldGroup>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFieldGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FIELDGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFieldGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FIELDGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFieldGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FIELDGROUP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
