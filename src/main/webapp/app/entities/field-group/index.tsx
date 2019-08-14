import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FieldGroup from './field-group';
import FieldGroupDetail from './field-group-detail';
import FieldGroupUpdate from './field-group-update';
import FieldGroupDeleteDialog from './field-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FieldGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FieldGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FieldGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={FieldGroup} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FieldGroupDeleteDialog} />
  </>
);

export default Routes;
