/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import NavigationLoader from './components/Loader/LazyLoader/NavigationLoader';
import Navigation from './components/Navigation/index';
import routes from './routes';
import { fetchUserInfo } from './redux/features/user/userSlice';

const NotFoundPage = lazy(() => import('./NotFound'));
function App() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  useEffect(() => {
    if (userState?.user?.accessToken && window.location.pathname === '/') {
      window.location.href = 'client/my-projects';
    }
  }, [userState.user]);

  return (
    <Suspense fallback={<NavigationLoader />}>
      <Navigation>
        <Routes>
          {routes().map((route) => {
            if (route.routes && route.routes.length > 0) {
              return route.routes.map((sub) => (
                <Route
                  key={sub.key}
                  path={route.path + sub.path}
                  exact={sub.exact}
                  element={<sub.component {...sub} />}
                />
              ));
            }
            return (
              <Route
                key={route.key}
                path={route.path}
                exact={route.exact}
                element={<route.component {...route} />}
              />
            );
          })}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Navigation>
    </Suspense>
  );
}

export default App;
