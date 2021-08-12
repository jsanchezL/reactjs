import {Layout} from 'antd';
import './LayoutAccount.scss';
import LoadRoutes from './LoadRoutes';
import AdminSignIn from '../pages/Admin/SignIn/SignIn';
import {Route, Redirect} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function LayoutAccount (props) {
  const {routes} = props;
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
        <h2>Menu Sider Account</h2>
        <Layout>
          <Header>
            Header Account
          </Header>
          <Content>
            <LoadRoutes routes={routes} />
          </Content>
          <Footer>
            JLSL
          </Footer>
        </Layout>
      </Layout>
    );
  }
  return null;
}
