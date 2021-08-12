import {Layout} from 'antd';
import './LayoutAccount.scss';
import LoadRoutes from './LoadRoutes';
import AdminSignIn from '../pages/Admin/SignIn/SignIn';
import {Route, Redirect} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import MenuTop from '../components/MenuTop';
import MenuSider from '../components/MenuSider';
import {useState} from 'react';

export default function LayoutAccount (props) {
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
        <MenuSider menuCollapsed={menuCollapsed} isAdmin={user.isAdmin} />
        <Layout
          className="layout-account"
          style={{marginLeft: menuCollapsed ? '80px' : '200px'}}
        >
          <Header className="layout-account__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-account__content">
            <LoadRoutes routes={routes} />
          </Content>
          <Footer className="layout-account__footer">
            JLSL
          </Footer>
        </Layout>
      </Layout>
    );
  }
  return null;
}
