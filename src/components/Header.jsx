import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';
import membericon from '../images/profile.png';
import api from '../utils/api';
import SearchIcon from '@mui/icons-material/Search';
import { AuthContext } from '../context/authContext';
import Avatar from '@mui/material/Avatar';

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
    max-width: 1270px;
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
    gap: 25px;
`;
const NavigationRight = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
const Logo = styled(Link)`
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
    padding: 7px 30px;
    border: 1px solid #236262;
    border-radius: 5px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    color: #00684a;
    font-size: 17px;
    font-weight: 500;
    &:hover {
        border-radius: 25px;
        color: #ffffff;
        background-color: #236262;
    }
`;

const Memberlink = styled(Link)`
    margin-left: 10px;
`;

const SignButton = styled(Link)`
    font-size: 17px;
    text-decoration: none;
    padding: 7px 30px;
    border-radius: 6px;
    margin: 0px 5px;
    transition: all 0.3s;
    &.signup {
        background-color: #236262;
        border: 2px solid #236262;
        color: #ffffff;
    }
    &.signin {
        border: 2px solid #236262;
        color: #236262;
    }
    &:hover {
        border-radius: 100px;
    }
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
    const { isLogin, user } = React.useContext(AuthContext);
    const redirect = async () => {
        window.location.replace(`/search?keyword=${inputValue}`);
    };
    return (
        <Navigation>
            <NavigationContentWrap>
                <NavigationLeft>
                    <Logo to="/" />
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
                    {isLogin ? (
                        <>
                            <CreatePost to="/create">發文</CreatePost>
                            <Memberlink to="/user/setting">
                                <Avatar src={user.image} sx={{ width: 43, height: 43 }} />
                            </Memberlink>
                        </>
                    ) : (
                        <>
                            <SignButton className="signup" to="/signup">
                                註冊
                            </SignButton>
                            <SignButton className="signin" to="/signin">
                                登入
                            </SignButton>
                        </>
                    )}
                </NavigationRight>
            </NavigationContentWrap>
        </Navigation>
    );
};

export default Header;
