import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthContextProvider } from './context/authContext';
import React from 'react';
import Header from './components/Header';
import webSocket from 'socket.io-client';
import updateNewsfeeds from './utils/updateUserNewsfeeds';
import { useLocation } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#236262',
            light: '#a5dfdf',
        },
        secondary: {
            main: '#050505',
            dark: '#6f6f6f',
            light: '#d4d4d4',
        },
        success: {
            main: '#C5DECD',
        },
        warning: {
            main: '#EEC0B0',
        },
        red: {
            main: '#D2042D',
        },
    },
});

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap');
  * {
    font-family: 'Noto Sans TC', sans-serif;
    box-sizing: border-box;
  }
  body {
    margin: 50px 0px;
    background-color: #f0f4f5;
    letter-spacing:0.1em;
    color: #050505;
    width: 100%;
  }
`;
function App() {
    const location = useLocation();
    const [ws, setWs] = React.useState(null);

    React.useEffect(() => {
        const newWs = webSocket('http://localhost:8000');
        setWs(newWs);
    }, []);

    React.useEffect(() => {
        if (ws) {
            ws.on('Update user newsfeeds', async () => {
                const jwtToken = window.localStorage.getItem('jwtToken');
                await updateNewsfeeds(jwtToken);
            });
        }
    }, [ws]);

    return (
        <>
            <AuthContextProvider>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    {location.pathname !== '/signup' &&
                        location.pathname !== '/signin' &&
                        location.pathname !== '/create' &&
                        !/^\/edit/.test(location.pathname) && <Header />}
                    <Outlet />
                </ThemeProvider>{' '}
            </AuthContextProvider>
        </>
    );
}

export default App;
