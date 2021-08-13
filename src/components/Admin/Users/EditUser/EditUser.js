import {Avatar, Layout, notification} from 'antd';
import {useDropzone} from 'react-dropzone';
import {useState, useCallback, useEffect} from 'react';
import noAvatar from '../../../../assets/img/png/noavatar.png';
import './EditUser.scss';
import {
  getAvatarApi,
  updateUserApi,
  uploadAvatarApi,
} from '../../../../api/user';
import {getAccessTokenApi} from '../../../../api/auth';
import UserForm from '../UserForm';

export default function EditUser (props) {
  const {userSelected, setReloadUsers} = props;
  const {Sider, Content} = Layout;
  const [avatar, setAvatar] = useState (null);
  const [userData, setUserData] = useState (userSelected);
  const token = getAccessTokenApi ();

  const uploadAvatar = async (data, token) => {
    let result = await uploadAvatarApi (data._id, data.avatar, token);
    if (result.ok) {
      notification[result.ok ? 'success' : 'error'] ({
        message: result.message,
      });
      return '';
    }
    return result;
  };

  const sendUpdateUser = async (data, token) => {
    let result = await updateUserApi (data._id, data, token);
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
        setReloadUsers (true);
      }
    } else {
      await sendUpdateUser (userUpdate, token);
      setReloadUsers (true);
    }
  };

  useEffect (
    () => {
      if (userSelected && userSelected.avatar && userSelected.avatar !== '') {
        getAvatarApi (userSelected.avatar, token).then (imageBlob => {
          const imageObjectURL = URL.createObjectURL (imageBlob);
          setAvatar (imageObjectURL);
        });
      } else {
        setAvatar (null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userSelected]
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
        />
      </Content>
    </Layout>
  );
}

function UploadAvatar (props) {
  const {avatar, setAvatar} = props;
  const [avatarUrl, setAvatarUrl] = useState (null);

  useEffect (
    () => {
      if (avatar) {
        if (avatar.preview) {
          setAvatarUrl (avatar.preview);
        } else {
          setAvatarUrl (avatar);
        }
      } else {
        setAvatarUrl (null);
      }
    },
    [avatar]
  );

  const onDrop = useCallback (
    acceptedFiles => {
      const file = acceptedFiles[0];
      if (file) {
        setAvatar ({
          file,
          preview: URL.createObjectURL (file),
        });
      }
    },
    [setAvatar]
  );

  const {getRootProps, getInputProps, isDragActive} = useDropzone ({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="myAvatar" {...getRootProps ()}>
      <input {...getInputProps ()} />
      {isDragActive
        ? <Avatar size={150} src={noAvatar} />
        : <Avatar size={150} src={avatarUrl ? avatarUrl : noAvatar} />}
    </div>
  );
}
