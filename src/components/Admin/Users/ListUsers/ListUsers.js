import {
  Switch,
  Table,
  Tag,
  Divider,
  Space,
  Button,
  Drawer,
  Popconfirm,
  notification,
  Row,
  Col,
} from 'antd';
import {useState, useEffect} from 'react';
import {UserOutlined, UserDeleteOutlined} from '@ant-design/icons';
import EditUser from '../EditUser';
import CreateUser from '../CreateUser';
import {getAccessTokenApi} from '../../../../api/auth';
import {deleteUserApi} from '../../../../api/user';

export default function ListUsers (props) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 170,
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      key: 'lastname',
      width: 170,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: email => <a href="mailto:">{email}</a>,
      width: 250,
    },
    {
      title: 'Role',
      key: 'isAdmin',
      dataIndex: 'isAdmin',
      render: isAdmin => (
        <Tag
          color={isAdmin ? 'geekblue' : 'green'}
          key={isAdmin ? 'Admin' : 'Regular'}
        >
          {isAdmin ? 'Admin' : 'Regular'}
        </Tag>
      ),
      width: 70,
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<UserOutlined />}
            size="small"
            onClick={() => setUserSelected (record)}
          >
            Edit
          </Button>
          {record.status === 'Active' || record.status === 'Pending'
            ? ''
            : <Popconfirm
                title="Sure to delete?"
                visible={visiblePop}
                onConfirm={handlePopOk}
                okButtonProps={{loading: confirmLoading}}
                okType="danger"
                onCancel={handleCancel}
              >
                <Button
                  danger
                  icon={<UserDeleteOutlined />}
                  size="small"
                  onClick={() => showPopconfirm (record._id)}
                >
                  Delete
                </Button>
              </Popconfirm>}
        </Space>
      ),
    },
  ];
  const {usersActive, usersInActive, setReloadUsers} = props;
  const [viewUsersActive, setViewUsersActive] = useState (true);
  const [isVisibleDrawer, setIsVisibleDrawer] = useState (false);
  const [titleDrawer, setTitleDrawer] = useState ('');
  const [drawerContent, setDrawerContent] = useState (null);
  const [userSelected, setUserSelected] = useState ({
    name: '',
    lastname: '',
    email: '',
    isAdmin: false,
    status: '',
    avatar: '',
  });

  const [visiblePop, setVisiblePop] = useState (false);
  const [confirmLoading, setConfirmLoading] = useState (false);
  const [idUserDel, setIdUserDel] = useState ('');
  const token = getAccessTokenApi ();

  const showPopconfirm = id => {
    setVisiblePop (true);
    setIdUserDel (id);
  };

  const handlePopOk = async () => {
    setConfirmLoading (true);
    console.log (idUserDel);
    let result = await deleteUserApi (idUserDel, token);
    notification[result.ok ? 'success' : 'error'] ({
      message: result.message,
    });
    setVisiblePop (false);
    setConfirmLoading (false);
    setIdUserDel ('');
    setReloadUsers (true);
  };

  const handleCancel = () => {
    setVisiblePop (false);
    setIdUserDel ('');
  };

  useEffect (
    () => {
      if (userSelected && userSelected._id) {
        setTitleDrawer ('Edit');
        setIsVisibleDrawer (true);
        setDrawerContent (
          <EditUser
            userSelected={userSelected}
            setReloadUsers={setReloadUsers}
          />
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userSelected]
  );

  const createUser = () => {
    setTitleDrawer ('Create');
    setIsVisibleDrawer (true);
    setDrawerContent (<CreateUser setReloadUsers={setReloadUsers} />);
  };

  return (
    <div>
      <Row>
        <Col span={6}>
          <Switch
            defaultChecked
            onChange={() => setViewUsersActive (!viewUsersActive)}
            checkedChildren="Active"
            unCheckedChildren="Inactive/Pending"
          />
        </Col>
        <Col span={12} />
        <Col span={6} style={{textAlign: 'right'}}>
          <Button
            icon={<UserOutlined />}
            type="primary"
            size="small"
            onClick={() => createUser ()}
          >
            Create User
          </Button>
        </Col>
      </Row>
      <Divider />
      <Table
        columns={columns}
        dataSource={viewUsersActive ? usersActive : usersInActive}
      />
      <Drawer
        placement="top"
        visible={isVisibleDrawer}
        key="top"
        title={titleDrawer}
        onClose={() => {
          setIsVisibleDrawer (false);
          setTitleDrawer ('');
          setUserSelected ({
            name: '',
            lastname: '',
            email: '',
            isAdmin: false,
            status: '',
            avatar: '',
          });
        }}
        destroyOnClose="true"
        height="500"
      >
        {drawerContent}
      </Drawer>
    </div>
  );
}
