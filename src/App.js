import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { ModalContext } from './context/ModalContext';
import { SearchContext } from './context/SearchContext';
import { useState } from 'react';

// pages & components
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Pipeline from './pages/home/Pipeline';
import Deals from './pages/deals/Deals';
import DealsForm from './components/DealsForm';
import Modal from './components/Modal';
import ForgotPassword from './pages/forgot-password/ForgotPassword';

function App() {
  const { authIsReady, user } = useAuthContext();

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  // reset search term to null
  const resetSearchTerm = () => {
    setSearchTerm('');
  };

  return (
    <SearchContext.Provider
      value={{ searchTerm, handleChangeSearchTerm, resetSearchTerm }}
    >
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
                <Route path='/forgot-password'>
                  {user && <Redirect to='/' />}
                  {!user && <ForgotPassword />}
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
    </SearchContext.Provider>
  );
}

export default App;
