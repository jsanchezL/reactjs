import './scss/App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from './config/routes';
import AuthProvider from './providers/AuthProvider';

function RouteWithSubRoutes (route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />}
    />
  );
}

function App () {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map ((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
