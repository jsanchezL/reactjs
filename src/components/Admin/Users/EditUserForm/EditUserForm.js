import {Avatar, Input, Form, Switch, Button, Layout, Row, Col} from 'antd';
import {useDropzone} from 'react-dropzone';
import {useState, useCallback, useEffect} from 'react';
import noAvatar from '../../../../assets/img/png/noavatar.png';
import './EditUserFrom.scss';

export default function EditUserForm({user}) {
  const {Sider, Content} = Layout;
  const [avatar, setAvatar] = useState (null);
  const [userData, setUserData] = useState ({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    isAdmin: user.isAdmin,
    status: user.status,
    avatar: user.avatar,
  });

  const updateUser = e => {
    console.log (userData);
    e.preventDefault ();
  };

  useEffect (
    () => {
      console.log (user);
    },
    [user]
  );

  return (
    <Layout className="editUserForm">
      <Sider>
        <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      </Sider>
      <Content>
        <Form
          name="editForm"
          layout="horizontal"
          onSubmit={updateUser}
          labelCol={{span: 3}}
        >
          <Form.Item />
          <Form.Item label="Name">
            <Input
              placeholder="Name"
              defaultValue={userData.name}
              onChange={e => setUserData ({...userData, name: e.target.value})}
            />
          </Form.Item>
          <Form.Item label="Lastname">
            <Input
              placeholder="Lastname"
              defaultValue={userData.lastname}
              onChange={e =>
                setUserData ({...userData, lastname: e.target.value})}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              placeholder="x@x.com"
              defaultValue={userData.email}
              onChange={e => setUserData ({...userData, email: e.target.value})}
            />
          </Form.Item>
          <Form.Item label="Role">
            <Switch
              checkedChildren="Admin"
              unCheckedChildren="Regular"
              checked={userData.isAdmin}
            />
          </Form.Item>
          <Form.Item label="Status">
            <Switch
              checkedChildren="Active"
              unCheckedChildren="Inactive"
              checked={userData.status}
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
      </Content>
    </Layout>
  );
}

function UploadAvatar (props) {
  const {avatar, setAvatar} = props;
  const onDrop = useCallback (
    acceptedFiles => {
      const file = acceptedFiles[0];
      setAvatar ({
        file,
        preview: URL.createObjectURL (file),
      });
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
        : <Avatar size={150} src={avatar ? avatar.preview : noAvatar} />}
    </div>
  );
}
