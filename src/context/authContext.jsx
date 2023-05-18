import React from 'react';
import api from '../utils/api';
import { Alerts } from '../utils/alerts';

export const AuthContext = React.createContext({
    isLogin: false,
    user: {},
    loading: false,
    jwtToken: '',
    login: () => {},
    logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = React.useState(false);
    const [user, setUser] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [jwtToken, setJwtToken] = React.useState();

    const login = async (userData) => {
        setJwtToken(userData.jwtToken);
        delete userData.jwtToken;
        setUser(userData);
        setIsLogin(true);
    };

    const logout = async () => {
        try {
            setLoading(true);
            setIsLogin(false);
            const data = { logoutTime: new Date() };
            await api.logout(user.userId, data, jwtToken);
            setUser({});
            setJwtToken();
            window.localStorage.removeItem('jwtToken');
            window.localStorage.removeItem('savedPosts');
            window.localStorage.removeItem('user');
            window.localStorage.removeItem('likedPosts');
            window.localStorage.removeItem('relevantPosts');
            setLoading(false);
        } catch (e) {
            setIsLogin(false);
            Alerts.serverError().then((result) => {
                if (result.isConfirmed) {
                    window.localStorage.removeItem('jwtToken');
                    setJwtToken();
                    window.location.replace(`/`);
                }
            });
        }
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
        } catch (e) {
            if (e.response.status === 401) {
                setIsLogin(false);
                const result = await Alerts.unauthorized();
                if (result.isConfirmed) {
                    window.localStorage.removeItem('jwtToken');
                    setJwtToken();
                    window.location.replace(`/`);
                }
            } else {
                Alerts.serverError();
            }
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
                login,
                logout,
                setUser,
            }}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
