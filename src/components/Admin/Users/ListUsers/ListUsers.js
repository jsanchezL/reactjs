import {Switch, Table, Tag, Divider, Space, Button, Drawer} from 'antd';
import {useState} from 'react';
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
      render: email => <a>{email}</a>,
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
            onClick={() => editRecord (record)}
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
  const {usersActive, usersInActive} = props;
  const [viewUsersActive, setViewUsersActive] = useState (true);
  const [isVisibleDrawer, setIsVisibleDrawer] = useState (false);
  const [titleDrawer, setTitleDrawer] = useState ('');
  const [drawerContent, setDrawerContent] = useState (null);

  const editRecord = record => {
    setTitleDrawer ('Edit');
    setIsVisibleDrawer (true);
    setDrawerContent (<EditUserForm user={record} />);
  };

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
        }}
        height="500"
      >
        {drawerContent}
      </Drawer>
    </div>
  );
}
