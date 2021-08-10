import {useState, useEffect} from 'react';
import {getAccessTokenApi} from '../../../api/auth';
import {getUsersByStatusApi} from '../../../api/user';
import ListUsers from '../../../components/Admin/Users/ListUsers/ListUsers';

export default function Users () {
  const [usersActive, setUsersActive] = useState ([]);
  const [usersInActive, setUsersInActive] = useState ([]);
  const [reloadUsers, setReloadUsers] = useState (false);
  const token = getAccessTokenApi ();

  useEffect (
    () => {
      async function getUsers (token) {
        const usersActive = await getUsersByStatusApi (token, true);
        setUsersActive (usersActive);
        const usersInActive = await getUsersByStatusApi (token, false);
        setUsersInActive (usersInActive);
      }
      getUsers (token);
      setReloadUsers (false);
    },
    [token, reloadUsers]
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
