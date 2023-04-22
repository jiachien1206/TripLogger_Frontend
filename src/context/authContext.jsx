import React from 'react';
import api from '../utils/api';

export const AuthContext = React.createContext({
    isLogin: false,
    user: {},
    loading: false,
    jwtToken: '',
    signin: () => {},
    saveUserData: () => {},
    logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = React.useState(false);
    const [user, setUser] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [jwtToken, setJwtToken] = React.useState();

    const handleLoginResponse = React.useCallback(async (response) => {
        const accessToken = response.authResponse.accessToken;
        const { data } = await api.signin({
            provider: 'facebook',
            access_token: accessToken,
        });
        const { access_token: tokenFromServer, user: userData } = data;
        setUser(userData);
        setJwtToken(tokenFromServer);
        window.localStorage.setItem('jwtToken', tokenFromServer);
        setIsLogin(true);
        return tokenFromServer;
    }, []);

    React.useEffect(() => {
        const checkAuthStatus = async () => {
            // await fb.init();
            // const response = await fb.getLoginStatus();
            // if (response.status === 'connected') {
            //   handleLoginResponse(response);
            //   setLoading(false);
            // } else {
            //   window.localStorage.removeItem('jwtToken');
            //   setLoading(false);
            // }
        };
        checkAuthStatus();
    }, [handleLoginResponse]);

    const saveUserData = async (userData) => {
        setJwtToken(userData.jwtToken);
        delete userData.jwtToken;
        setUser(userData);
        setIsLogin(true);
    };

    const signin = async () => {
        setLoading(true);
        //   const response = await fb.login();
        //   if (response.status === 'connected') {
        //     const tokenFromServer = handleLoginResponse(response);
        //     setLoading(false);
        //     return tokenFromServer;
        //   } else {
        //     window.localStorage.removeItem('jwtToken');
        //     setLoading(false);
        //     return null;
        //   }
    };

    const logout = async () => {
        setLoading(true);
        //   await fb.logout();
        setIsLogin(false);
        setUser({});
        setJwtToken();
        window.localStorage.removeItem('jwtToken');
        setLoading(false);
    };
    const getUserData = async (jwtToken) => {
        const res = await api.getUser('_', jwtToken);

        if (!res.error) {
            const user = res.data.data;
            setUser(user);
            setIsLogin(true);
        }
    };
    React.useEffect(() => {
        const jwtToken = window.localStorage.getItem('jwtToken');
        if (jwtToken) {
            getUserData(jwtToken);
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
