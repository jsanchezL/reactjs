import {
  Avatar,
  Input,
  Form,
  Switch,
  Button,
  Layout,
  Row,
  Col,
  notification,
} from 'antd';
import {useDropzone} from 'react-dropzone';
import {useState, useCallback, useEffect} from 'react';
import noAvatar from '../../../../assets/img/png/noavatar.png';
import './EditUserFrom.scss';
import {
  getAvatarApi,
  updateUserApi,
  uploadAvatarApi,
} from '../../../../api/user';
import {getAccessTokenApi} from '../../../../api/auth';

export default function EditUserForm (props) {
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
    <Layout className="editUserForm">
      <Sider>
        <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      </Sider>
      <Content>
        <EditForm
          userData={userData}
          setUserData={setUserData}
          updateUser={updateUser}
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

function EditForm (props) {
  const {userData, setUserData, updateUser} = props;
  const [form] = Form.useForm ();

  const onFinishFailed = errorInfo => {
    console.log ('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      name="editForm"
      layout="horizontal"
      onFinish={updateUser}
      labelCol={{span: 3}}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="name"
        label="Name"
        required={true}
        initialValue={userData.name}
        rules={[{required: true, message: 'Please input your name!'}]}
      >
        <Input
          onChange={e => setUserData ({...userData, name: e.target.value})}
        />
      </Form.Item>
      <Form.Item
        name="lastname"
        label="Lastname"
        required={true}
        initialValue={userData.lastname}
        rules={[{required: true, message: 'Please input your lastname!'}]}
      >
        <Input
          onChange={e => setUserData ({...userData, lastname: e.target.value})}
        />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        required={true}
        initialValue={userData.email}
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input
          onChange={e => setUserData ({...userData, email: e.target.value})}
        />
      </Form.Item>
      <Form.Item label="Role">
        <Switch
          checkedChildren="Admin"
          unCheckedChildren="Regular"
          checked={userData.isAdmin}
          onChange={(v, e) => setUserData ({...userData, isAdmin: v})}
        />
      </Form.Item>
      <Form.Item label="Status">
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          checked={userData.status}
          onChange={(v, e) => setUserData ({...userData, status: v})}
        />
      </Form.Item>
      <Row>
        <Col span={24} style={{textAlign: 'right'}}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
