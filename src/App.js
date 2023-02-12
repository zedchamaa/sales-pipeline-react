import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { ModalContext } from './context/ModalContext';
import { useState } from 'react';

// pages & components
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Pipeline from './pages/home/Pipeline';
import Deals from './pages/deals/Deals';
import DealsForm from './components/DealsForm';
import Modal from './components/Modal';

function App() {
  const { authIsReady, user } = useAuthContext();

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, handleShowModal, handleCloseModal }}
    >
      <div className='App'>
        {showModal && (
          <Modal
            onClick={handleCloseModal}
            title={'Add New Deal'}
          >
            <DealsForm
              uid={user.uid}
              onClick={handleCloseModal}
            />
          </Modal>
        )}
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
    </ModalContext.Provider>
  );
}

export default App;
