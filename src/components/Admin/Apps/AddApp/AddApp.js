import {Layout, notification} from 'antd';
import {useState, useEffect} from 'react';
import {getAccessTokenApi} from '../../../../api/auth';
import {addAppApi, uploadAvatarAddAppApi} from '../../../../api/appTemplate';
import AppForm from '../AppForm';
import './AddApp.scss';
import UploadAvatar from '../../../UploadAvatar/UploadAvatar';

export default function AddApp (props) {
  const {reloadApps} = props;
  const {Sider, Content} = Layout;
  const [appData, setAppData] = useState ({
    name: '',
    description: '',
    typePlatform: '',
    isSecure: true,
    versionAPI: '',
    avatar: '',
  });
  const [avatar, setAvatar] = useState (null);
  const token = getAccessTokenApi ();

  const callUploadAvatar = async (data, token) => {
    let result = await uploadAvatarAddAppApi (data.avatar, token);
    if (result.ok) {
      notification[result.ok ? 'success' : 'error'] ({
        message: result.message,
      });
      return '';
    }
    return result;
  };

  const callAddApp = async e => {
    let result = await addAppApi (appData, token);
    notification[result.ok ? 'success' : 'error'] ({
      message: result.message,
    });
  };

  const addApp = async e => {
    let app = appData;
    if (typeof app.avatar === 'object') {
      let name = await callUploadAvatar (app, token);
      if (name) {
        app.avatar = name;
        await callAddApp (app, token);
        reloadApps (token);
      }
    } else {
      await callAddApp (app, token);
      reloadApps (token);
    }
  };

  useEffect (
    () => {
      if (avatar) {
        setAppData ({...appData, avatar: avatar.file});
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [avatar]
  );

  return (
    <Layout className="appForm">
      <Sider>
        <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      </Sider>
      <Content>
        <AppForm appData={appData} setAppData={setAppData} saveApp={addApp} />
      </Content>
    </Layout>
  );
}
