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
            main: '#459a82',
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
    background-color: #f0f5f2;
    letter-spacing:0.2em;
    color: #4a4a4a;
    width: 100%;
    --primary-color: #459a82;
    --light-green:#4DAB9A;
    --super-light-green:#94CFBE;
    --secondary-color:#fea44a;
    --light-orange:#F8D6B5;
    --background:#f0f5f2;
    --primary-font:#4a4a4a;
    --secondary-font:#65676b;
    --secondary-background:#dfdfdf;
    --white:#F3FFF4;
    --red:#f52047;
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
