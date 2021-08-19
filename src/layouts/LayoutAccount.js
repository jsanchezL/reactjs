import {Layout} from 'antd';
import './LayoutAccount.scss';
import LoadRoutes from './LoadRoutes';
import SignIn from '../pages/SignIn/SignIn';
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
        <Route path="/login" component={SignIn} />
        <Redirect to="/login" />
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
              user={user}
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
