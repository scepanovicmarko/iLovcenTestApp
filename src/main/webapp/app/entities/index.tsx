import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Field from './field';
import FieldGroup from './field-group';
import Policy from './policy';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/field`} component={Field} />
      <ErrorBoundaryRoute path={`${match.url}/field-group`} component={FieldGroup} />
      <ErrorBoundaryRoute path={`${match.url}/policy`} component={Policy} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
