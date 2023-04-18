import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import React from 'react';
import Header from './components/Header';
import webSocket from 'socket.io-client';
import updateNewsfeeds from './utils/updateUserNewsfeeds';

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
            <GlobalStyle />
            <Header />
            <Outlet />
        </>
    );
}

export default App;
