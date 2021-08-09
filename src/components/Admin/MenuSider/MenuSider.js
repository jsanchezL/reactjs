import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {Layout, Menu} from 'antd';
import {HomeOutlined, UserOutlined} from '@ant-design/icons';
import './MenuSider.scss';

function MenuSider (props) {
  const {Sider} = Layout;
  const {Item} = Menu;
  const {menuCollapsed, location} = props;
  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Item key="/admin">
          <Link to={'/admin'}>
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Link>
        </Item>
        <Item key="/admin/users">
          <Link to={'/admin/users'}>
            <UserOutlined />
            <span className="nav-text">Users</span>
          </Link>
        </Item>
      </Menu>
    </Sider>
  );
}

export default withRouter (MenuSider);
