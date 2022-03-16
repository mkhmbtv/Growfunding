import SignUpForm from './SignUpForm';
import { Modal } from '../../context/Modal';
import { useAuth } from '../../context/AuthContext';


const SignUpFormModal = () => {
  const { 
    showSignupForm,
    setShowSignupForm, 
    showLoginForm, 
    setShowLoginForm 
  } = useAuth();

  const openModal = () => {
    if (showLoginForm) {
      setShowLoginForm(false);
    }
    setShowSignupForm(true);
  };

  return (
    <>
      <button onClick={openModal}>
        Signup
      </button>
      {showSignupForm && (
        <Modal onClose={() => setShowSignupForm(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  )
};

export default SignUpFormModal