import LoginForm from './LoginForm';
import { Modal } from '../../context/Modal';
import { useAuth } from '../../context/AuthContext';


const LoginFormModal = () => {
  const {
    showSignupForm,
    setShowSignupForm,
    showLoginForm,
    setShowLoginForm
  } = useAuth();

  const openModal = () => {
    if (showSignupForm) {
      setShowSignupForm(false);
    }
    setShowLoginForm(true)
  }

  return (
    <>
      <button onClick={openModal}>
        Login
      </button>
      {showLoginForm && (
        <Modal onClose={() => setShowLoginForm(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  )
};

export default LoginFormModal