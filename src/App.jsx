import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import React from 'react';
import Header from './components/Header';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    
  }
  body {
    margin: 100px auto 0px;
    background-color: #f5f5f5;
    max-width:1000px;
  }
`;

function App() {
    const [ws, setWs] = React.useState(null);

    return (
        <>
            <GlobalStyle />
            <Header />
            <Outlet />
        </>
    );
}

export default App;
