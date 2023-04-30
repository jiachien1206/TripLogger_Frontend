import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthContextProvider } from './context/authContext';
import React from 'react';
import Header from './components/Header';
import { useLocation } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#236262',
            light: '#a5dfdf',
        },
        secondary: {
            main: '#4a4a4a',
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
    letter-spacing:0.2em;
    color: #4a4a4a;
    width: 100%;
  }
`;
function App() {
    const location = useLocation();

    return (
        <>
            <AuthContextProvider>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    {location.pathname !== '/create' && !/^\/edit/.test(location.pathname) && (
                        <Header />
                    )}
                    <Outlet />
                </ThemeProvider>{' '}
            </AuthContextProvider>
        </>
    );
}

export default App;
