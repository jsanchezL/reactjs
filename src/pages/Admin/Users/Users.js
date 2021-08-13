import {useState, useEffect} from 'react';
import {getAccessTokenApi} from '../../../api/auth';
import {getUsersByStatusApi} from '../../../api/user';
import ListUsers from '../../../components/Admin/Users/ListUsers/ListUsers';

export default function Users () {
  const [usersActive, setUsersActive] = useState ([]);
  const [usersInActive, setUsersInActive] = useState ([]);
  const token = getAccessTokenApi ();
  const [isFreshData, setFreshData] = useState (false);

  const setReloadUsers = async token => {
    let usersActive = await getUsersByStatusApi (
      {
        values: ['Active'],
      },
      token
    );
    setUsersActive (usersActive);
    let usersInActive = await getUsersByStatusApi (
      {
        values: ['Inactive', 'Pending'],
      },
      token
    );
    setUsersInActive (usersInActive);
  };

  useEffect (
    () => {
      if (!isFreshData) {
        setReloadUsers (token);
      }
      setTimeout (() => {
        setFreshData (true);
      }, 36000); // Cada minuto recuperamos nuevos datos del servidor
      setFreshData (false);
    },
    [token, isFreshData]
  );

  return (
    <div>
      <ListUsers
        usersActive={usersActive}
        usersInActive={usersInActive}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}
