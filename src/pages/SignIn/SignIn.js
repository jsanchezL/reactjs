import './signin.scss';
import {Layout, Tabs} from 'antd';
import {Redirect} from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm';
import LoginForm from '../../components/LoginForm';
import {getAccessTokenApi} from '../../api/auth';

export default function SignIn () {
  const {Content} = Layout;
  const {TabPane} = Tabs;

  if (getAccessTokenApi ()) {
    return <Redirect to="/admin" />;
  }

  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          <img alt="wprjs" />
        </h1>
        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane tab={<span>Sign In</span>} key="1">
              <LoginForm />
            </TabPane>
            <TabPane tab={<span>Register</span>} key="2">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
