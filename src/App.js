import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
              <Routes>
                <Route
                  path='/'
                  element={user ? <Pipeline /> : <Navigate to='/login' />}
                />
                <Route
                  path='/forgot-password'
                  element={user ? <Navigate to='/' /> : <ForgotPassword />}
                />
                <Route
                  path='/deals'
                  element={user ? <Deals /> : <Navigate to='/login' />}
                />
                <Route
                  path='/*'
                  element={user ? <Pipeline /> : <Navigate to='/login' />}
                />
                <Route
                  path='/login'
                  element={user ? <Navigate to='/' /> : <Login />}
                />
                <Route
                  path='/signup'
                  element={
                    user && user.displayName ? <Navigate to='/' /> : <Signup />
                  }
                />
              </Routes>
            </BrowserRouter>
          )}
        </div>
      </ModalContext.Provider>
    </SearchContext.Provider>
  );
}

export default App;
