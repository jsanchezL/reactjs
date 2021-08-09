import './MenuTop.scss';
import {Button} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import MenuTopLogo from '../../../assets/img/png/menutoplogo.png';
import {logout} from '../../../api/auth';

export default function MenuTop (props) {
  const {menuCollapsed, setMenuCollapsed} = props;
  const logoutUser = () => {
    logout ();
    window.location.reload ();
  };
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
        <Button type="link" onClick={logoutUser}>
          <LogoutOutlined />
        </Button>
      </div>
    </div>
  );
}
