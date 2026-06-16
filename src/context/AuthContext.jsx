import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // In-memory user store – lives as long as the browser tab is open
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  /** Register a new user and auto-login */
  const register = (name, email, password) => {
    const normalised = email.trim().toLowerCase();
    if (users.find(u => u.email === normalised)) {
      return { success: false, error: 'Este email ya está registrado.' };
    }
    const newUser = { name: name.trim(), email: normalised, password };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser({ name: newUser.name, email: newUser.email });
    return { success: true };
  };

  /** Login with email + password */
  const login = (email, password) => {
    const normalised = email.trim().toLowerCase();
    const found = users.find(u => u.email === normalised && u.password === password);
    if (!found) {
      return { success: false, error: 'Email o contraseña incorrectos.' };
    }
    setCurrentUser({ name: found.name, email: found.email });
    return { success: true };
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
