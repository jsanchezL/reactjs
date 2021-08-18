import {
  LayoutOutlined,
  UserOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

export const menu = {
  admin: {
    items: [
      {
        key: '/admin',
        to: '/admin',
        label: 'Dashboard',
        icon: <LayoutOutlined />,
      },
      {
        key: '/admin/users',
        to: '/admin/users',
        label: 'Users',
        icon: <UserOutlined />,
      },
      {
        key: '/admin/apps',
        to: '/admin/apps',
        label: 'Apps',
        icon: <AppstoreOutlined />,
      },
    ],
  },
  account: {
    items: [
      {
        key: '/account',
        to: '/account',
        label: 'Dashboard',
        icon: <LayoutOutlined />,
      },
    ],
  },
};
