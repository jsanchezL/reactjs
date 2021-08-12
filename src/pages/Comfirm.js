import {comfirmSignUpApi} from '../api/auth';
import {notification} from 'antd';
import {useState, useEffect} from 'react';
import {Link, useParams, useRouteMatch} from 'react-router-dom';

export default function Comfirm () {
  const [comfirm, setComfirm] = useState (false);
  const match = useRouteMatch ('/confirm/:confirmationCode');
  let params = useParams ();

  useEffect (
    () => {
      async function comfirmSignUp (confirmationCode) {
        let result = await comfirmSignUpApi (confirmationCode);
        notification[result.ok ? 'success' : 'error'] ({
          message: result.message,
        });
      }

      if (match && !comfirm) {
        comfirmSignUp (params.confirmationCode);
        setComfirm (true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [comfirm]
  );

  return (
    <div>
      <h3>
        <strong>Account confirmed!</strong>
      </h3>
      <Link to={'/admin/login'}>
        Please Login
      </Link>
    </div>
  );
}
