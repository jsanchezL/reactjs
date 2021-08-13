import {Layout, notification} from 'antd';
import './CreateUser.scss';
import {getAccessTokenApi} from '../../../../api/auth';
import {useState} from 'react';
import {createUserApi} from '../../../../api/user';
import UserForm from '../UserForm';

export default function CreateUser (props) {
  const {setReloadUsers} = props;
  const {Sider, Content} = Layout;
  const [userData, setUserData] = useState ({
    name: '',
    lastname: '',
    email: '',
    password: '',
    isAdmin: false,
    status: 'Active',
  });
  const token = getAccessTokenApi ();

  const createUser = async e => {
    let result = await createUserApi (userData, token);
    notification[result.ok ? 'success' : 'error'] ({
      message: result.message,
    });
    setReloadUsers (true);
  };

  return (
    <Layout className="userForm">
      <Sider />
      <Content>
        <UserForm
          userData={userData}
          setUserData={setUserData}
          saveUser={createUser}
        />
      </Content>
    </Layout>
  );
}
