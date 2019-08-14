import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './field-group.reducer';
import { IFieldGroup } from 'app/shared/model/field-group.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFieldGroupProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class FieldGroup extends React.Component<IFieldGroupProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { fieldGroupList, match } = this.props;
    return (
      <div>
        <h2 id="field-group-heading">
          <Translate contentKey="iLovcenTestApp.fieldGroup.home.title">Field Groups</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="iLovcenTestApp.fieldGroup.home.createLabel">Create a new Field Group</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {fieldGroupList && fieldGroupList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="iLovcenTestApp.fieldGroup.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="iLovcenTestApp.fieldGroup.value">Value</Translate>
                  </th>
                  <th>
                    <Translate contentKey="iLovcenTestApp.fieldGroup.policy">Policy</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {fieldGroupList.map((fieldGroup, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${fieldGroup.id}`} color="link" size="sm">
                        {fieldGroup.id}
                      </Button>
                    </td>
                    <td>{fieldGroup.name}</td>
                    <td>{fieldGroup.value}</td>
                    <td>{fieldGroup.policy ? <Link to={`policy/${fieldGroup.policy.id}`}>{fieldGroup.policy.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${fieldGroup.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${fieldGroup.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${fieldGroup.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="iLovcenTestApp.fieldGroup.home.notFound">No Field Groups found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ fieldGroup }: IRootState) => ({
  fieldGroupList: fieldGroup.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldGroup);
