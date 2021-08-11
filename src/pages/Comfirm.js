import {comfirmSignUpApi} from '../api/auth';
import {notification} from 'antd';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function Comfirm (props) {
  const [comfirm, setComfirm] = useState (false);

  useEffect (
    () => {
      async function comfirmSignUp (confirmationCode) {
        let result = await comfirmSignUpApi (confirmationCode);
        notification[result.ok ? 'success' : 'error'] ({
          message: result.message,
        });
      }

      if (props.match.path === '/confirm/:confirmationCode' && !comfirm) {
        comfirmSignUp (props.match.params.confirmationCode);
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
