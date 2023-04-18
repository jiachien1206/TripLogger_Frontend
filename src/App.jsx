import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import Header from './components/Header';
import webSocket from 'socket.io-client';
import updateNewsfeeds from './utils/updateUserNewsfeeds';

const theme = createTheme({
    palette: {
        primary: {
            main: '#236262',
            light: '#a5dfdf',
        },
        secondary: {
            main: '#6f6f6f',
            dark: '#6f6f6f',
            light: '#d4d4d4',
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
    margin: 100px auto 0px;
    background-color: #f5f5f5;
    max-width:1200px;
    letter-spacing:0.1em;
    color: #171717;
  }
`;

function App() {
    const [ws, setWs] = React.useState(null);

    React.useEffect(() => {
        const newWs = webSocket('http://localhost:8080');
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
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Header />
                <Outlet />
            </ThemeProvider>
        </>
    );
}

export default App;
