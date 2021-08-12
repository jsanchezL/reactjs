import {HomeOutlined, UserOutlined} from '@ant-design/icons';

export const menu = {
  admin: {
    items: [
      {
        key: '/admin',
        to: '/admin',
        label: 'Home',
        icon: <HomeOutlined />,
      },
      {
        key: '/admin/users',
        to: '/admin/users',
        label: 'Users',
        icon: <UserOutlined />,
      },
    ],
  },
  account: {
    items: [
      {
        key: '/account',
        to: '/account',
        label: 'Home',
        icon: <HomeOutlined />,
      },
    ],
  },
};
