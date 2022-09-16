import { lazy } from 'react';

const LandingPage = lazy(() => import('./views/LandingPage'));
const ClientProjectsPage = lazy(() => import('./views/client/projects'));
const ClientProjectsDetailPage = lazy(() => import('./views/client/project_detail'));
const ClientCommunityPage = lazy(() => import('./views/client/community'));

const routes = [
  {
    path: '/',
    key: 'LANDING_PAGE',
    exact: true,
    component: LandingPage,
  },
  // when logged in
  {
    path: '/client',
    key: 'CLIENT',
    routes: [
      {
        path: '/my-projects',
        key: 'MY_PROJECTS',
        title: 'My Projects',
        exact: true,
        component: ClientProjectsPage,
      },
      {
        path: '/community',
        key: 'COMMUNITY',
        title: 'Community',
        exact: true,
        component: ClientCommunityPage,
      },
      {
        path: '/my-projects/:id',
        key: 'MY_PROJECT_DETAIL',
        exact: true,
        component: ClientProjectsDetailPage,
      },
    ],
  },
];

export default routes;
