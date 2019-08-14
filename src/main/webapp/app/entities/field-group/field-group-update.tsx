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
import { getEntity, updateEntity, createEntity, reset } from './field-group.reducer';
import { IFieldGroup } from 'app/shared/model/field-group.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFieldGroupUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFieldGroupUpdateState {
  isNew: boolean;
  policyId: string;
}

export class FieldGroupUpdate extends React.Component<IFieldGroupUpdateProps, IFieldGroupUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      policyId: '0',
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { fieldGroupEntity } = this.props;
      const entity = {
        ...fieldGroupEntity,
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
    this.props.history.push('/entity/field-group');
  };

  render() {
    const { fieldGroupEntity, policies, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="iLovcenTestApp.fieldGroup.home.createOrEditLabel">
              <Translate contentKey="iLovcenTestApp.fieldGroup.home.createOrEditLabel">Create or edit a FieldGroup</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : fieldGroupEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="field-group-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="field-group-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="field-group-name">
                    <Translate contentKey="iLovcenTestApp.fieldGroup.name">Name</Translate>
                  </Label>
                  <AvField
                    id="field-group-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="valueLabel" for="field-group-value">
                    <Translate contentKey="iLovcenTestApp.fieldGroup.value">Value</Translate>
                  </Label>
                  <AvField id="field-group-value" type="text" name="value" />
                </AvGroup>
                <AvGroup>
                  <Label for="field-group-policy">
                    <Translate contentKey="iLovcenTestApp.fieldGroup.policy">Policy</Translate>
                  </Label>
                  <AvInput id="field-group-policy" type="select" className="form-control" name="policy.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/field-group" replace color="info">
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
  fieldGroupEntity: storeState.fieldGroup.entity,
  loading: storeState.fieldGroup.loading,
  updating: storeState.fieldGroup.updating,
  updateSuccess: storeState.fieldGroup.updateSuccess
});

const mapDispatchToProps = {
  getPolicies,
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
)(FieldGroupUpdate);
