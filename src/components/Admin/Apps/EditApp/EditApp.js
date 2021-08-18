import './EditApp.scss';
import {Layout, notification} from 'antd';
import {useState, useEffect} from 'react';
import {getAccessTokenApi} from '../../../../api/auth';
import AppForm from '../AppForm';
import UploadAvatar from '../../../UploadAvatar/UploadAvatar';
import {
  uploadAvatarEditAppApi,
  getAvatarAppApi,
  updateAppApi,
} from '../../../../api/appTemplate';

export default function EditApp (props) {
  const {appSelected, reloadApps} = props;
  const {Sider, Content} = Layout;
  const [avatar, setAvatar] = useState (null);
  const [appData, setAppData] = useState (appSelected);
  const token = getAccessTokenApi ();

  const callUploadAvatar = async (data, token) => {
    let result = await uploadAvatarEditAppApi (data._id, data.avatar, token);
    if (result.ok) {
      notification[result.ok ? 'success' : 'error'] ({
        message: result.message,
      });
      return '';
    }
    return result;
  };

  const callUpdateApp = async (data, token) => {
    let result = await updateAppApi (data._id, data, token);
    notification[result.ok ? 'success' : 'error'] ({
      message: result.message,
    });
  };

  const updateApp = async e => {
    let app = appData;
    if (typeof app.avatar === 'object') {
      let name = await callUploadAvatar (app, token);
      if (name) {
        app.avatar = name;
        await callUpdateApp (app, token);
        reloadApps (token);
      }
    } else {
      await callUpdateApp (app, token);
      reloadApps (token);
    }
  };

  useEffect (
    () => {
      if (appSelected && appSelected.avatar && appSelected.avatar !== '') {
        getAvatarAppApi (appSelected.avatar, token).then (imageBlob => {
          const imageObjectURL = URL.createObjectURL (imageBlob);
          setAvatar (imageObjectURL);
        });
      } else {
        setAvatar (null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appSelected]
  );

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
        <AppForm
          appData={appData}
          setAppData={setAppData}
          saveApp={updateApp}
        />
      </Content>
    </Layout>
  );
}
