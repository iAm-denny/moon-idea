import { lazy } from 'react';
import { useSelector } from 'react-redux';

const LandingPage = lazy(() => import('./views/LandingPage'));
const ClientProjectsPage = lazy(() => import('./views/client/projects'));
const ClientProjectsDetailPage = lazy(() =>
  import('./views/client/project_detail')
);
const ClientCommunityPage = lazy(() => import('./views/client/community'));
const ClientCommunityDetailPage = lazy(() =>
  import('./views/client/community/Detail')
);
const ClientNotificationPage = lazy(() =>
  import('./views/client/notification')
);

const routeFunction = () => {
  const userState = useSelector((state) => state.user);
  const defaultRoutes = [
    {
      path: '/',
      key: 'LANDING_PAGE',
      exact: true,
      component: LandingPage,
    },
  ];
  const clientRoutes = [
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
        {
          path: '/community/:id',
          key: 'COMMUNITY_DETAIL',
          title: '',
          exact: true,
          component: ClientCommunityDetailPage,
        },
        {
          path: '/notification/',
          key: 'NOTIFICATION',
          title: 'Notification',
          exact: true,
          component: ClientNotificationPage,
        },
      ],
    },
  ];
  const routes = userState?.user?.accessToken ? clientRoutes : defaultRoutes;
  return routes;
};

export default routeFunction;
