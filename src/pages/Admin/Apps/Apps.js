import ListApps from '../../../components/Admin/Apps/ListApps';
import {useState, useEffect} from 'react';
import {getAccessTokenApi} from '../../../api/auth';
import {getAppsApi} from '../../../api/appTemplate';

export default function Apps () {
  const [data, setData] = useState ([]);
  const token = getAccessTokenApi ();
  const [isFreshData, setFreshData] = useState (false);

  const reloadApps = async token => {
    let apps = await getAppsApi (token);
    setData (apps);
  };

  useEffect (
    () => {
      if (!isFreshData) {
        reloadApps (token);
      }
      setTimeout (() => {
        setFreshData (true);
      }, 36000); // Retrieve records each minute
      setFreshData (false);
    },
    [token, isFreshData]
  );

  return <ListApps data={data} reloadApps={reloadApps} />;
}
