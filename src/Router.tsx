import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/Common/ErrorPage';
import Loading from './components/Common/Loading';
import Layout from './components/Layout/Layout';
import ROUTES from './constants/router';

// const Chat = lazy(() => import('./pages/Chat/Chat'));
const User = lazy(() => import('./pages/User/User'));
const Login = lazy(() => import('./pages/User/Login'));
const Signup = lazy(() => import('./pages/User/Join'));
const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: ROUTES.JOIN,
        element: (
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: ROUTES.USER,
        element: (
          <Suspense fallback={<Loading />}>
            <User />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
