import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPolicy } from 'app/shared/model/policy.model';
import { getEntities as getPolicies } from 'app/entities/policy/policy.reducer';
import { IFieldGroup } from 'app/shared/model/field-group.model';
import { getEntities as getFieldGroups } from 'app/entities/field-group/field-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './field.reducer';
import { IField } from 'app/shared/model/field.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFieldUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFieldUpdateState {
  isNew: boolean;
  policyId: string;
  fieldGroupId: string;
}

export class FieldUpdate extends React.Component<IFieldUpdateProps, IFieldUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      policyId: '0',
      fieldGroupId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getPolicies();
    this.props.getFieldGroups();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { fieldEntity } = this.props;
      const entity = {
        ...fieldEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/field');
  };

  render() {
    const { fieldEntity, policies, fieldGroups, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iLovcenTestApp.field.home.createOrEditLabel">
              <Translate contentKey="iLovcenTestApp.field.home.createOrEditLabel">Create or edit a Field</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : fieldEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="field-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="field-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="field-name">
                    <Translate contentKey="iLovcenTestApp.field.name">Name</Translate>
                  </Label>
                  <AvField
                    id="field-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="valueLabel" for="field-value">
                    <Translate contentKey="iLovcenTestApp.field.value">Value</Translate>
                  </Label>
                  <AvField id="field-value" type="text" name="value" />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="field-type">
                    <Translate contentKey="iLovcenTestApp.field.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="field-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && fieldEntity.type) || 'NUMBER'}
                  >
                    <option value="NUMBER">{translate('iLovcenTestApp.FieldType.NUMBER')}</option>
                    <option value="TEXT">{translate('iLovcenTestApp.FieldType.TEXT')}</option>
                    <option value="DATE">{translate('iLovcenTestApp.FieldType.DATE')}</option>
                    <option value="BOOLEAN">{translate('iLovcenTestApp.FieldType.BOOLEAN')}</option>
                    <option value="LONGTEXT">{translate('iLovcenTestApp.FieldType.LONGTEXT')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="field-policy">
                    <Translate contentKey="iLovcenTestApp.field.policy">Policy</Translate>
                  </Label>
                  <AvInput id="field-policy" type="select" className="form-control" name="policy.id">
                    <option value="" key="0" />
                    {policies
                      ? policies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="field-fieldGroup">
                    <Translate contentKey="iLovcenTestApp.field.fieldGroup">Field Group</Translate>
                  </Label>
                  <AvInput id="field-fieldGroup" type="select" className="form-control" name="fieldGroup.id">
                    <option value="" key="0" />
                    {fieldGroups
                      ? fieldGroups.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/field" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  policies: storeState.policy.entities,
  fieldGroups: storeState.fieldGroup.entities,
  fieldEntity: storeState.field.entity,
  loading: storeState.field.loading,
  updating: storeState.field.updating,
  updateSuccess: storeState.field.updateSuccess
});

const mapDispatchToProps = {
  getPolicies,
  getFieldGroups,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldUpdate);
