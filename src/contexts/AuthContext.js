import { Token } from "@/api";
import { User } from "@/api";
import { BasicModal } from "@/components/Shared";

const { createContext, useState, useEffect } = require("react");

export const AuthContext = createContext();

const tokenCrtl = new Token();
const userCrtl = new User();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = tokenCrtl.getToken();

      if (!token) {
        logout();
        setLoading(false);
        return;
      }

      if (tokenCrtl.hasExpired(token)) {
        logout();
      } else {
        await login(token);
      }
    })();
  }, []);

  const login = async (token) => {
    try {
      tokenCrtl.setToken(token);
      const user = await userCrtl.getMe();
      setUser(user);
      setToken(token);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const logout = () => {
    tokenCrtl.removeToken();
    setToken(null);
    setUser(null);
  };

  const updateUser = (key, value) => {
    console.log(key, value);
    setUser({
      ...user,
      [key]: value,
    });
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    updateUser,
  };

  if (loading) return null;

  return (
    <>
      <AuthContext.Provider value={data}>
        <>{children}</>
      </AuthContext.Provider>
    </>
  );
}
