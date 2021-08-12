import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {Layout, Menu} from 'antd';
import './MenuSider.scss';
import {menu} from '../../config/menu';

function MenuSider (props) {
  const {Sider} = Layout;
  const {Item} = Menu;
  const {menuCollapsed, location, isAdmin} = props;
  const items = isAdmin ? menu.admin.items : menu.account.items;

  return (
    <Sider className="custom-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        {items.map (item => (
          <Item key={item.key}>
            <Link to={item.to}>
              {item.icon ? item.icon : ''}
              <span className="nav-text">{item.label}</span>
            </Link>
          </Item>
        ))}
      </Menu>
    </Sider>
  );
}

export default withRouter (MenuSider);
