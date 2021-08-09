import {Layout} from 'antd';
import './LayoutAdmin.scss';
import LoadRoutes from './LoadRoutes';
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';
import {useState} from 'react';
import AdminSignIn from '../pages/Admin/SignIn/SignIn';
import {Route, Redirect} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function LayoutAdmin (props) {
  const {routes} = props;
  const [menuCollapsed, setMenuCollapsed] = useState (true);
  const {Header, Content, Footer} = Layout;
  const {user, isLoading} = useAuth ();

  // When user not login redirect ...
  if (!user && !isLoading) {
    return (
      <div>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </div>
    );
  }

  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin"
          style={{marginLeft: menuCollapsed ? '80px' : '200px'}}
        >
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            <LoadRoutes routes={routes} />
          </Content>
          <Footer className="layout-admin__footer">
            JLSL
          </Footer>
        </Layout>
      </Layout>
    );
  }
  return null;
}
