import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './field-group.reducer';
import { IFieldGroup } from 'app/shared/model/field-group.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFieldGroupDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FieldGroupDetail extends React.Component<IFieldGroupDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { fieldGroupEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="iLovcenTestApp.fieldGroup.detail.title">FieldGroup</Translate> [<b>{fieldGroupEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="iLovcenTestApp.fieldGroup.name">Name</Translate>
              </span>
            </dt>
            <dd>{fieldGroupEntity.name}</dd>
            <dt>
              <span id="value">
                <Translate contentKey="iLovcenTestApp.fieldGroup.value">Value</Translate>
              </span>
            </dt>
            <dd>{fieldGroupEntity.value}</dd>
            <dt>
              <Translate contentKey="iLovcenTestApp.fieldGroup.policy">Policy</Translate>
            </dt>
            <dd>{fieldGroupEntity.policy ? fieldGroupEntity.policy.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/field-group" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/field-group/${fieldGroupEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ fieldGroup }: IRootState) => ({
  fieldGroupEntity: fieldGroup.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldGroupDetail);
