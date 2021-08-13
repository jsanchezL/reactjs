import './LoginForm.scss';
import {Form, Input, Button, notification, Checkbox} from 'antd';
import {signInApi} from '../../api/user';
import {isAdmin} from '../../api/auth';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../utils/constants';

export default function LoginForm () {
  const onFinish = async values => {
    const result = await signInApi (values);

    if (result.message) {
      notification['error'] ({
        message: result.message,
      });
    } else {
      const {accessToken, refreshToken} = result;
      localStorage.setItem (ACCESS_TOKEN, accessToken);
      localStorage.setItem (REFRESH_TOKEN, refreshToken);

      notification['success'] ({
        message: 'Login successful',
      });

      if (isAdmin (accessToken)) {
        window.location.href = '/admin';
      } else {
        window.location.href = '/account';
      }
    }
  };

  const onFinishFailed = errorInfo => {
    console.log ('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your e-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
