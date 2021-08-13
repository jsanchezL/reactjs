// Layout
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';
import LayoutAccount from '../layouts/LayoutAccount';

// Admin Pages
import AdminHome from '../pages/Admin';
import AdminUsers from '../pages/Admin/Users';

// Account Pages
import AccountHome from '../pages/Account';

//Pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Comfirm from '../pages/Comfirm';
import AutoSignIn from '../pages/AutoSignIn';
import SignIn from '../pages/SignIn';

// Others
import Error404 from '../pages/Error404';

const routes = [
  {
    path: '/admin',
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: '/admin',
        component: AdminHome,
        exact: true,
      },
      {
        path: '/admin/users',
        component: AdminUsers,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: '/account',
    component: LayoutAccount,
    exact: false,
    routes: [
      {
        path: '/account',
        component: AccountHome,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: '/',
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
      },
      {
        path: '/contact',
        component: Contact,
        exact: true,
      },
      {
        path: '/confirm/:confirmationCode',
        component: Comfirm,
        exact: false,
      },
      {
        path: '/autoSignIn/:confirmationCode',
        component: AutoSignIn,
        exact: false,
      },
      {
        path: '/login',
        component: SignIn,
        exact: true,
      },
      {
        component: Error404, // Esto siempre debe ir al final de las rutas
      },
    ],
  },
];

export default routes;
