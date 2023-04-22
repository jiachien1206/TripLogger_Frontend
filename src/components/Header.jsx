import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';
import magnifier from '../images/search.svg';
import membericon from '../images/profile.png';
import api from '../utils/api';
import SearchIcon from '@mui/icons-material/Search';
import { AuthContext } from '../context/authContext';

const Navigation = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    z-index: 99;
    background-color: white;

    box-shadow: 0 1px 6px 0 rgb(32 33 36 / 5%);
`;
const NavigationContentWrap = styled.div`
    max-width: 1350px;
    height: 100%;
    margin: 0px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;
const NavigationLeft = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    gap: 25px;
`;
const NavigationRight = styled.div`
    display: flex;
    align-items: center;
`;
const Logo = styled.a`
    width: 60px;
    height: 50px;
    background-image: url(${logo});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
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
    height: 100%;
    width: 260px;
    outline: none;
    border: none;
    font-size: 18px;
    line-height: 19px;
    transition: border-color 1s;
    border: solid 1px #d4d4d4;
    border-radius: 5px;
    padding-left: 10px;
    &:hover {
        border: 2px solid #d4d4d4;
    }
    &:focus {
        border: 2px solid #236262;
    }
`;

const SearchButton = styled.button`
    position: absolute;
    height: 36px;
    width: 36px;
    border: none;
    background-color: #ffffff;
    right: 2px;
    top: 2px;
    border-radius: 3px;
    padding: 0px;
    &:hover {
        cursor: pointer;
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
    const { isLogin } = React.useContext(AuthContext);
    const redirect = async () => {
        window.location.replace(`/search?keyword=${inputValue}`);
    };

    return (
        <Navigation>
            <NavigationContentWrap>
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
                            <SearchIcon color="primary" sx={{ fontSize: 26 }} />
                        </SearchButton>
                    </SearchBar>
                </NavigationLeft>
                <NavigationRight>
                    <CreatePost to="/create">發文</CreatePost>
                    <Memberlink to="/signin">
                        <Membericon />
                    </Memberlink>
                </NavigationRight>
            </NavigationContentWrap>
        </Navigation>
    );
};

export default Header;
