import {useState, useEffect} from 'react';
import {getAccessTokenApi} from '../../../api/auth';
import {getUsersByStatusApi} from '../../../api/user';
import ListUsers from '../../../components/Admin/Users/ListUsers/ListUsers';

export default function Users () {
  const [usersActive, setUsersActive] = useState ([]);
  const [usersInActive, setUsersInActive] = useState ([]);
  const token = getAccessTokenApi ();

  useEffect (
    () => {
      async function getUsers () {
        const usersActive = await getUsersByStatusApi (token, true);
        setUsersActive (usersActive);
        const usersInActive = await getUsersByStatusApi (token, false);
        setUsersInActive (usersInActive);
      }
      getUsers ();
    },
    [token]
  );

  return (
    <div>
      <ListUsers usersActive={usersActive} usersInActive={usersInActive} />
    </div>
  );
}
