import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';
import api from '../utils/api';
import SearchIcon from '@mui/icons-material/Search';
import { AuthContext } from '../context/authContext';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

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

const Header = () => {
    const [inputValue, setInputValue] = React.useState('');
    const { logout, isLogin, user, jwtToken } = React.useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const redirect = async () => {
        window.location.replace(`/search?keyword=${inputValue}`);
    };

    const handleLogout = async () => {
        logout();
        const data = { logoutTime: new Date() };
        await api.logout(data, jwtToken);
        window.location.reload();
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
                            <Memberlink
                                id="basic-button"
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
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
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            width: '200px',
                            color: '#65676b',
                            fontWeight: 'bold',
                            padding: '2px 10px',
                            overflow: 'visible',
                            borderRadius: '8px',
                            filter: 'drop-shadow(0px 1px 4px rgba(0,0,0,0.16))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem
                        onClick={() => {
                            navigate('/user/setting');
                        }}
                        sx={{
                            '&:hover': {
                                borderRadius: '5px',
                            },
                        }}
                    >
                        個人資料
                    </MenuItem>
                    <MenuItem
                        sx={{
                            '&:hover': {
                                borderRadius: '5px',
                            },
                        }}
                        onClick={() => {
                            navigate('/user/map');
                        }}
                    >
                        旅遊足跡
                    </MenuItem>
                    <MenuItem
                        sx={{
                            '&:hover': {
                                borderRadius: '5px',
                            },
                        }}
                        onClick={() => {
                            navigate('/user/posts');
                        }}
                    >
                        我的文章
                    </MenuItem>
                    <MenuItem
                        sx={{
                            '&:hover': {
                                borderRadius: '5px',
                            },
                        }}
                        onClick={() => {
                            navigate('/user/save');
                        }}
                    >
                        收藏清單
                    </MenuItem>
                    <MenuItem
                        sx={{
                            '&:hover': {
                                borderRadius: '5px',
                            },
                        }}
                        onClick={handleLogout}
                    >
                        登出
                    </MenuItem>
                </Menu>
            </NavigationContentWrap>
        </Navigation>
    );
};

export default Header;
