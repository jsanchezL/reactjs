import {Route, Switch} from 'react-router-dom';

export default function LoadRoutes({routes}) {
  // Switch sirve para mostrar Error404 cuando la ruta no exista
  return (
    <Switch>
      {routes.map ((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
