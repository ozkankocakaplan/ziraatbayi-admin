import {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextState {
  isAuth: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextState>({
  isAuth: false,
  isLoading: true,
  login: (token: string) => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuth(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    } else {
      logout();
    }
    setIsLoading(false);
  };
  const value = useMemo(
    () => ({ isAuth, login, logout, isLoading }),
    [isAuth, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
export default useAuth;
