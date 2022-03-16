import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider ({ children }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        showLoginForm,
        setShowLoginForm,
        showSignupForm,
        setShowSignupForm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

