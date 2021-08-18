import ListApps from '../../../components/Admin/Apps/ListApps';
import {useState, useEffect} from 'react';
import {getAccessTokenApi} from '../../../api/auth';
import {getAppsApi} from '../../../api/appTemplate';

export default function Apps () {
  const [data, setData] = useState ([]);
  const token = getAccessTokenApi ();
  const [isFreshData, setFreshData] = useState (false);

  // Retrieve records from Backend and putting into data state
  const reloadApps = async token => {
    let apps = await getAppsApi (token);
    setData (apps);
  };

  // Refresh data each 30 seconds
  useEffect (
    () => {
      if (!isFreshData) {
        reloadApps (token);
      }
      setTimeout (() => {
        setFreshData (true);
      }, 30000);
      setFreshData (false);
    },
    [token, isFreshData]
  );

  return <ListApps data={data} reloadApps={reloadApps} />;
}
