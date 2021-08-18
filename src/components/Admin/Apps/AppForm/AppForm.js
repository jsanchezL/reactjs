import {Input, Form, Switch, Button, Row, Col} from 'antd';

export default function AppForm (props) {
  const {appData, setAppData, saveApp} = props;
  const [form] = Form.useForm ();

  const onFinishFailed = errorInfo => {
    console.log ('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      name="editForm"
      layout="horizontal"
      onFinish={saveApp}
      labelCol={{span: 3}}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="name"
        label="Name"
        required={true}
        initialValue={appData.name}
        rules={[{required: true, message: 'Please input name!'}]}
      >
        <Input
          onChange={e => setAppData ({...appData, name: e.target.value})}
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        required={true}
        initialValue={appData.description}
        rules={[{required: true, message: 'Please input description!'}]}
      >
        <Input
          onChange={e => setAppData ({...appData, description: e.target.value})}
        />
      </Form.Item>
      <Form.Item
        name="typePlatform"
        label="Type"
        required={true}
        initialValue={appData.typePlatform}
        rules={[
          {
            required: true,
            message: 'Please input Type!',
          },
        ]}
      >
        <Input
          onChange={e =>
            setAppData ({...appData, typePlatform: e.target.value})}
        />
      </Form.Item>
      <Form.Item label="Is Secure ? ">
        <Switch
          checkedChildren="https://"
          unCheckedChildren="http://"
          checked={appData.isSecure}
          onChange={(v, e) => setAppData ({...appData, isSecure: v})}
        />
      </Form.Item>
      <Form.Item
        name="versionAPI"
        label="Version API"
        initialValue={appData.versionAPI}
        rules={[
          {
            required: true,
            message: 'Please input Version API!',
          },
        ]}
      >
        <Input
          onChange={e => setAppData ({...appData, versionAPI: e.target.value})}
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
