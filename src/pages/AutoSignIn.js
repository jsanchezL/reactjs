import {notification} from 'antd';
import {useState, useEffect} from 'react';
import {useParams, useRouteMatch} from 'react-router-dom';
import {autoSignInApi, isAdmin} from '../api/auth';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../utils/constants';

export default function AutoSignIn () {
  const [isSignIn, setIsSignIn] = useState (false);
  const [content, setContent] = useState (<div><h3>Pleas Wait...</h3></div>);
  const match = useRouteMatch ('/autoSignIn/:confirmationCode');
  let params = useParams ();

  useEffect (
    () => {
      async function autoSignIn (confirmationCode) {
        let result = await autoSignInApi (confirmationCode);
        if (result.message) {
          notification['error'] ({
            message: result.message,
          });
          setTimeout (() => {
            window.location.href = '/';
          }, 5000);
        } else {
          const {accessToken, refreshToken} = result;
          localStorage.setItem (ACCESS_TOKEN, accessToken);
          localStorage.setItem (REFRESH_TOKEN, refreshToken);

          notification['success'] ({
            message: 'Login successful',
          });

          setIsSignIn (true);
          setContent (
            <div>
              <h3>
                <strong>Welcome !</strong>
              </h3>
            </div>
          );
          setTimeout (() => {
            if (isAdmin (accessToken)) {
              window.location.href = '/admin';
            } else {
              window.location.href = '/account';
            }
          }, 2500);
        }
      }

      if (match && !isSignIn) {
        autoSignIn (params.confirmationCode);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSignIn]
  );

  return <div>{content}</div>;
}
