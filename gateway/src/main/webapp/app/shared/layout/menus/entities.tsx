import React, { Suspense } from 'react';
import { translate } from 'react-jhipster';
import { importRemote } from '@module-federation/utilities';
import { NavDropdown } from './menu-components';

const EntitiesMenuItems = React.lazy(() => import('app/entities/menu').catch(() => import('app/shared/error/error-loading')));

const HoangfirstEntitiesMenuItems = React.lazy(async () =>
  importRemote<any>({
    url: `./services/hoangfirst`,
    scope: 'hoangfirst',
    module: './entities-menu',
  }).catch(() => import('app/shared/error/error-loading')),
);

const HoangsecondEntitiesMenuItems = React.lazy(async () =>
  importRemote<any>({
    url: `./services/hoangsecond`,
    scope: 'hoangsecond',
    module: './entities-menu',
  }).catch(() => import('app/shared/error/error-loading')),
);

export const EntitiesMenu = () => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <Suspense fallback={<div>loading...</div>}>
      <EntitiesMenuItems />
    </Suspense>
    <Suspense fallback={<div>loading...</div>}>
      <HoangfirstEntitiesMenuItems />
    </Suspense>
    <Suspense fallback={<div>loading...</div>}>
      <HoangsecondEntitiesMenuItems />
    </Suspense>
  </NavDropdown>
);
