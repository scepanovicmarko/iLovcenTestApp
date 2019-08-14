import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './field.reducer';
import { IField } from 'app/shared/model/field.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFieldProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Field extends React.Component<IFieldProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { fieldList, match } = this.props;
    return (
      <div>
        <h2 id="field-heading">
          <Translate contentKey="iLovcenTestApp.field.home.title">Fields</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="iLovcenTestApp.field.home.createLabel">Create a new Field</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {fieldList && fieldList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="iLovcenTestApp.field.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="iLovcenTestApp.field.value">Value</Translate>
                  </th>
                  <th>
                    <Translate contentKey="iLovcenTestApp.field.type">Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="iLovcenTestApp.field.policy">Policy</Translate>
                  </th>
                  <th>
                    <Translate contentKey="iLovcenTestApp.field.fieldGroup">Field Group</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {fieldList.map((field, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${field.id}`} color="link" size="sm">
                        {field.id}
                      </Button>
                    </td>
                    <td>{field.name}</td>
                    <td>{field.value}</td>
                    <td>
                      <Translate contentKey={`iLovcenTestApp.FieldType.${field.type}`} />
                    </td>
                    <td>{field.policy ? <Link to={`policy/${field.policy.id}`}>{field.policy.id}</Link> : ''}</td>
                    <td>{field.fieldGroup ? <Link to={`field-group/${field.fieldGroup.id}`}>{field.fieldGroup.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${field.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${field.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${field.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="iLovcenTestApp.field.home.notFound">No Fields found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ field }: IRootState) => ({
  fieldList: field.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);
