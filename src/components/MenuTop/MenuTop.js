import './MenuTop.scss';
import {Button, Menu, Space, Dropdown} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import MenuTopLogo from '../../assets/img/png/menutoplogo.png';
import {logout} from '../../api/auth';
import {Link} from 'react-router-dom';

export default function MenuTop (props) {
  const {menuCollapsed, setMenuCollapsed, user} = props;

  const logoutUser = () => {
    logout ();
    window.location.reload ();
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Button type="link">
        <Link to={user.isAdmin ? '/admin/profile' : '/account/profile'}>
            <SettingOutlined /> Settings
          </Link>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link" onClick={logoutUser}>
          <LogoutOutlined /> Log Out
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={MenuTopLogo}
          alt="Menu-top-logo"
        />
        <Button type="link" onClick={() => setMenuCollapsed (!menuCollapsed)}>
          {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Space direction="vertical">
          <Dropdown overlay={menu} placement="bottomRight">
            <Button type="link">
              <UserOutlined /> {user.lastname} {user.name}
            </Button>
          </Dropdown>
        </Space>
      </div>
    </div>
  );
}
