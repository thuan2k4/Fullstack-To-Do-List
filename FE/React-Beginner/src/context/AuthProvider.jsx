import { AuthContext } from './AuthContext';
import { useAuth } from './useAuth';

// Tạo Provider
export const AuthProvider = ({ children }) => {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};