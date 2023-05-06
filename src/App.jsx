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
            main: '#94CFBE',
        },
        warning: {
            main: '#EEC0B0',
        },
        red: {
            main: '#f52047',
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
    --dark-green:#2C6353;
    --super-light-green:#94CFBE;
    --secondary-color:#fea44a;
    --light-orange:#F8D6B5;
    --background:#f0f5f2;
    --primary-font:#4a4a4a;
    --secondary-font:#65676b;
    --third-font:#b4b8c1;
    --secondary-background:#dfdfdf;
    --white:#F3FFF4;
    --red:#f52047;
    --blue:#0051a5;
  }
  .swal2-container{
    z-index:10000;
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
