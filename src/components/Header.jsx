import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';
import magnifier from '../images/search.png';
import membericon from '../images/profile.png';
const Navigation = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 70px;
    width: 100%;
    z-index: 99;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    box-shadow: 0 1px 6px 0 rgb(32 33 36 / 5%);
`;
const NavigationLeft = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    gap: 20px;
`;
const NavigationRight = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
`;
const Logo = styled.a`
    width: 180px;
    height: 68px;
    background-image: url(${logo});
    background-size: contain;
`;

const Searchbar = styled.input`
    height: 40px;
    width: 260px;
    outline: none;
    margin-left: auto;
    border-radius: 5px;
    padding: 6px 45px 6px 20px;
    border: solid 1px #979797;
    background-image: url(${magnifier});
    background-size: 44px;
    background-position: 200px center;
    background-repeat: no-repeat;
    font-size: 20px;
    line-height: 24px;
    transition: border-color 1s;
    &:focus {
        border: 2px solid #00684a;
    }
`;

const CreatePost = styled(Link)`
    height: 40px;
    width: 100px;
    background: #00ed64;
    border: 1px solid #00684a;
    border-radius: 5px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: border-radius 0.2s;
    color: #00684a;
    &:hover {
        border-radius: 25px;
    }
`;

const Memberlink = styled(Link)`
    margin-left: 42px;
`;

const Membericon = styled.div`
    width: 44px;
    height: 44px;
    cursor: pointer;
    background-image: url(${membericon});
    background-size: contain;
`;

const Header = () => {
    const [inputValue, setInputValue] = React.useState('');
    return (
        <Navigation>
            <NavigationLeft>
                <Logo href="/" />
                <Searchbar onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
            </NavigationLeft>
            <NavigationRight>
                <CreatePost to="/create">發文</CreatePost>
                <Memberlink to="/user/signin">
                    <Membericon />
                </Memberlink>
            </NavigationRight>
        </Navigation>
    );
};

export default Header;
