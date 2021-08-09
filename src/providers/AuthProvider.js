import {useState, useEffect, createContext} from 'react';
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessTokenApi,
  logout,
} from '../api/auth';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext ();

export default function AuthProvider (props) {
  const {children} = props;
  const [user, setUser] = useState ({
    user: null,
    isLoading: false,
  });

  useEffect (
    () => {
      async function isUserLogin () {
        await checkUserLogin (setUser);
      }
      isUserLogin ();
    },
    [setUser]
  );

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

async function checkUserLogin (setUser) {
  const accessToken = getAccessTokenApi ();
  if (!accessToken) {
    const refreshToken = getRefreshTokenApi ();
    if (!refreshToken) {
      logout ();
      setUser ({
        user: null,
        isLoading: false,
      });
    } else {
      await refreshAccessTokenApi (refreshToken);
    }
  } else {
    setUser ({
      isLoading: false,
      user: jwtDecode (accessToken),
    });
  }
}
