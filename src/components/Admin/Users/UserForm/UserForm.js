import {Input, Form, Switch, Button, Row, Col, Radio} from 'antd';
export default function EditForm (props) {
  const {userData, setUserData, saveUser} = props;
  const [form] = Form.useForm ();

  const onFinishFailed = errorInfo => {
    console.log ('Failed:', errorInfo);
  };

  const optionsWithDisabled = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
    {label: 'Pending', value: 'Pending', disabled: true},
  ];

  return (
    <Form
      form={form}
      name="editForm"
      layout="horizontal"
      onFinish={saveUser}
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
      {userData.password === ''
        ? <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
        : ''}
      <Form.Item label="Role">
        <Switch
          checkedChildren="Admin"
          unCheckedChildren="Regular"
          checked={userData.isAdmin}
          onChange={(v, e) => setUserData ({...userData, isAdmin: v})}
        />
      </Form.Item>
      <Form.Item label="Status">
        <Radio.Group
          options={optionsWithDisabled}
          value={userData.status}
          onChange={e => setUserData ({...userData, status: e.target.value})}
          optionType="button"
          buttonStyle="solid"
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
