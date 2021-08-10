import {Switch, Table, Tag, Divider, Space, Button, Drawer} from 'antd';
import {useState, useEffect} from 'react';
import {UserOutlined, UserDeleteOutlined} from '@ant-design/icons';
import EditUserForm from '../EditUserForm';

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
          {record.status
            ? ''
            : <Button
                danger
                icon={<UserDeleteOutlined />}
                size="small"
                onClick={() => deleteRecord (record._id)}
              >
                Delete
              </Button>}
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
    status: false,
    avatar: '',
  });

  useEffect (
    () => {
      if (userSelected && userSelected._id) {
        setTitleDrawer ('Edit');
        setIsVisibleDrawer (true);
      }
      setDrawerContent (
        <EditUserForm
          userSelected={userSelected}
          setReloadUsers={setReloadUsers}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userSelected]
  );

  const deleteRecord = id => {
    setTitleDrawer ('Sure to delete?');
    setIsVisibleDrawer (true);
    console.log (id);
  };

  return (
    <div>

      <Switch
        defaultChecked
        onChange={() => setViewUsersActive (!viewUsersActive)}
        checkedChildren="Active"
        unCheckedChildren="Inactive"
      />
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
          setUserSelected (null);
        }}
        destroyOnClose="true"
        height="500"
      >
        {drawerContent}
      </Drawer>
    </div>
  );
}
