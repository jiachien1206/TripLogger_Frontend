import React from 'react';
import api from '../utils/api';
import updateNewsfeeds from '../utils/updateUserNewsfeeds';

export const AuthContext = React.createContext({
    isLogin: false,
    user: {},
    loading: false,
    jwtToken: '',
    signin: () => {},
    saveUserData: async () => {},
    logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = React.useState(false);
    const [user, setUser] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [jwtToken, setJwtToken] = React.useState();

    const saveUserData = async (userData) => {
        setJwtToken(userData.jwtToken);
        delete userData.jwtToken;
        setUser(userData);
        setIsLogin(true);
    };

    const signin = async () => {
        setLoading(true);
    };

    const logout = async () => {
        setLoading(true);
        setIsLogin(false);
        setUser({});
        setJwtToken();
        window.localStorage.removeItem('jwtToken');
        window.localStorage.removeItem('savedPosts');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('likedPosts');
        window.localStorage.removeItem('relevantPosts');
        setLoading(false);
    };
    const getUserData = async (jwtToken) => {
        try {
            const res = await api.getUser('_', jwtToken);
            if (!res.error) {
                const user = res.data.data;
                setJwtToken(jwtToken);
                setUser(user);
                setIsLogin(true);
            }
            setLoading(false);
        } catch {
            setIsLogin(false);
        }
    };

    React.useEffect(() => {
        const jwtToken = window.localStorage.getItem('jwtToken');
        if (jwtToken) {
            getUserData(jwtToken);
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLogin,
                user,
                loading,
                jwtToken,
                signin,
                saveUserData,
                logout,
                setUser,
            }}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
