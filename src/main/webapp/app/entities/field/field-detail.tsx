import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './field.reducer';
import { IField } from 'app/shared/model/field.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFieldDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FieldDetail extends React.Component<IFieldDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { fieldEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="iLovcenTestApp.field.detail.title">Field</Translate> [<b>{fieldEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="iLovcenTestApp.field.name">Name</Translate>
              </span>
            </dt>
            <dd>{fieldEntity.name}</dd>
            <dt>
              <span id="value">
                <Translate contentKey="iLovcenTestApp.field.value">Value</Translate>
              </span>
            </dt>
            <dd>{fieldEntity.value}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="iLovcenTestApp.field.type">Type</Translate>
              </span>
            </dt>
            <dd>{fieldEntity.type}</dd>
            <dt>
              <Translate contentKey="iLovcenTestApp.field.policy">Policy</Translate>
            </dt>
            <dd>{fieldEntity.policy ? fieldEntity.policy.id : ''}</dd>
            <dt>
              <Translate contentKey="iLovcenTestApp.field.fieldGroup">Field Group</Translate>
            </dt>
            <dd>{fieldEntity.fieldGroup ? fieldEntity.fieldGroup.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/field" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/field/${fieldEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ field }: IRootState) => ({
  fieldEntity: field.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldDetail);
