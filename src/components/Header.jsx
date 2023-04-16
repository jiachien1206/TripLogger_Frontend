import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';
import magnifier from '../images/search.svg';
import membericon from '../images/profile.png';
import api from '../utils/api';

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
const SearchBar = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 40px;
    width: 260px;
    margin-left: auto;
`;
const SearchInput = styled.input`
    height: 40px;
    width: 260px;
    outline: none;
    border: none;
    font-size: 20px;
    line-height: 24px;
    transition: border-color 1s;
    border: solid 1px #979797;
    border-radius: 5px;
    padding-left: 10px;
    &:focus {
        border: 2px solid #00684a;
    }
`;

const SearchButton = styled.button`
    position: absolute;
    height: 36px;
    width: 36px;
    border: none;
    background-color: #ffffff;
    padding-top: 0px;
    padding-bottom: 0px;
    left: 222px;
    top: 2px;
    border-radius: 3px;
    &:hover {
        background-color: #b8f4cf;
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
    const redirect = async () => {
        window.location.replace(`/search?keyword=${inputValue}`);
    };

    return (
        <Navigation>
            <NavigationLeft>
                <Logo href="/" />
                <SearchBar>
                    <SearchInput
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                window.location.replace(`/search?keyword=${inputValue}`);
                            }
                        }}
                    />
                    <SearchButton onClick={redirect}>
                        <img src={magnifier} />
                    </SearchButton>
                </SearchBar>
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
