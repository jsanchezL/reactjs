import {useState, useEffect} from 'react';
import {getAccessTokenApi} from '../../../api/auth';
import {getUsersByStatusApi} from '../../../api/user';
import ListUsers from '../../../components/Admin/Users/ListUsers/ListUsers';

export default function Users () {
  const [usersActive, setUsersActive] = useState ([]);
  const [usersInActive, setUsersInActive] = useState ([]);
  const token = getAccessTokenApi ();
  const [isFreshData, setFreshData] = useState (false);

  // Retrieve records from Backend and putting into data state
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

  // Refresh data each 30 seconds
  useEffect (
    () => {
      if (!isFreshData) {
        setReloadUsers (token);
      }
      setTimeout (() => {
        setFreshData (true);
      }, 30000);
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
