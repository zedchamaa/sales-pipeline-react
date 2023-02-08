import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Pipeline from './pages/home/Pipeline';
import Deals from './pages/deals/Deals';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path='/'
            >
              {!user && <Redirect to='/login' />}
              {user && <Pipeline />}
            </Route>
            <Route
              exact
              path='/deals'
            >
              {!user && <Redirect to='/login' />}
              {user && <Deals />}
            </Route>
            <Route path='/login'>
              {user && <Redirect to='/' />}
              {!user && <Login />}
            </Route>
            <Route path='/signup'>
              {user && user.displayName && <Redirect to='/' />}
              {!user && <Signup />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
