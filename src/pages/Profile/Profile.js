import {Layout, notification} from 'antd';
import {useState, useEffect} from 'react';
import {getAccessTokenApi, getCurrentUser} from '../../api/auth';
import {uploadAvatarApi, updateUserApi, getAvatarUserApi} from '../../api/user';
import '../../components/Admin/Users/EditUser/EditUser.scss';
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar';
import UserForm from '../../components/Admin/Users/UserForm';

export default function Profile () {
  const token = getAccessTokenApi ();
  const currentUser = getCurrentUser (token);
  const [userData, setUserData] = useState (currentUser);
  const [avatar, setAvatar] = useState (null);
  const {Sider, Content} = Layout;
  const [isLoadAv, setIsLoadAv] = useState (false);

  const uploadAvatar = async (data, token) => {
    let result = await uploadAvatarApi (data.id, data.avatar, token);
    if (result.ok) {
      notification[result.ok ? 'success' : 'error'] ({
        message: result.message,
      });
      return '';
    }
    return result;
  };

  const sendUpdateUser = async (data, token) => {
    let result = await updateUserApi (data.id, data, token);
    notification[result.ok ? 'success' : 'error'] ({
      message: result.message,
    });
  };

  const updateUser = async e => {
    let userUpdate = userData;
    if (typeof userUpdate.avatar === 'object') {
      let name = await uploadAvatar (userUpdate, token);
      if (name) {
        userUpdate.avatar = name;
        await sendUpdateUser (userUpdate, token);
      }
    } else {
      await sendUpdateUser (userUpdate, token);
    }
  };

  useEffect (
    () => {
      if (currentUser && currentUser.id && !isLoadAv) {
        getAvatarUserApi (currentUser.id, token).then (imageBlob => {
          const imageObjectURL = URL.createObjectURL (imageBlob);
          setAvatar (imageObjectURL);
        });
      } else {
        setAvatar (null);
      }
      setIsLoadAv (true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoadAv]
  );

  useEffect (
    () => {
      if (avatar) {
        setUserData ({...userData, avatar: avatar.file});
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [avatar]
  );

  return (
    <Layout className="userForm">
      <Sider>
        <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      </Sider>
      <Content>
        <UserForm
          userData={userData}
          setUserData={setUserData}
          saveUser={updateUser}
          isProfile={true}
        />
      </Content>
    </Layout>
  );
}
