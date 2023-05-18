import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';
import api from '../utils/api';
import { AuthContext } from '../context/authContext';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import webSocket from 'socket.io-client';
import updateNewsfeeds from '../utils/updateUserNewsfeeds.js';
import { FaBell } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { Alerts } from '../utils/alerts.js';
import { imageUrl } from '../utils/generateImageUrl';

const Navigation = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    z-index: 50;
    background-color: var(--primary-color);
    box-shadow: 0 1px 6px 0 rgb(32 33 36 / 5%);
`;
const NavigationContentWrap = styled.div`
    max-width: 95%;
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
    width: 50%;
`;
const NavigationRight = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;
const Logo = styled(Link)`
    width: 220px;
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
    width: 40%;
    &:focus-visible {
        outline: none !important;
    }
    /* margin-left: auto; */
`;
const SearchInput = styled.input`
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    font-size: 18px;
    line-height: 19px;
    transition: border-color 0.5s;
    border: solid 1px var(--white);
    border-radius: 10px;
    padding-left: 10px;
    background-color: var(--white);
    color: var(--primary-color);
    &:hover {
        border: 2px solid var(--secondary-color);
    }
    &:focus {
        border: 2px solid var(--secondary-color);
    }
`;

const SearchButton = styled.button`
    position: absolute;
    height: 36px;
    width: 36px;
    border: none;
    background-color: var(--white);
    right: 2px;
    top: 2px;
    border-radius: 9px;
    padding: 0px;
    &:hover {
        cursor: pointer;
    }
`;

const FiSearchS = styled(FiSearch)`
    font-size: 23px;
    color: var(--primary-color);
`;

const CreatePost = styled(Link)`
    padding: 7px 30px;
    border-radius: 5px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    color: var(--white);
    font-size: 19px;
    font-weight: 500;
    background-color: var(--secondary-color);
    &:hover {
        border-radius: 25px;
    }
`;

const Memberlink = styled(Link)``;

const Circle = styled.div`
    margin-left: 5px;
    width: 43px;
    height: 43px;
    border-radius: 100px;
    background-color: var(--secondary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1;
`;

const BellIcon = styled(FaBell)`
    width: 25px;
    height: 25px;
    color: var(--white);
`;

const SignButton = styled(Link)`
    padding: 7px 30px;
    border-radius: 5px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    color: var(--white);
    font-size: 19px;
    font-weight: 500;
    &.signin {
        background-color: var(--secondary-color);
        border: 2px solid var(--secondary-color);
        color: var(--white);
    }
    &.signup {
        border: 2px solid var(--white);
        color: var(--white);
    }
    &:hover {
        border-radius: 25px;
    }
`;

const Header = () => {
    const [inputValue, setInputValue] = React.useState('');
    const { logout, isLogin, user, jwtToken } = React.useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEln, setAnchorEln] = React.useState(null);
    const [badge, setBadge] = React.useState(0);
    const [notifications, setNotifications] = React.useState([]);
    const [ws, setWs] = React.useState(null);
    const open = Boolean(anchorEl);
    const openN = Boolean(anchorEln);
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickN = (event) => {
        setAnchorEln(event.currentTarget);
    };
    const handleCloseN = () => {
        setAnchorEln(null);
    };

    const redirect = async () => {
        window.location.replace(`/search?keyword=${inputValue}`);
    };

    const handleRead = async (e) => {
        handleClickN(e);
        await getNotification();
        setBadge(0);
        ws.emit('Read notification', { userId: user.userId });
        api.readNotification(jwtToken);
    };

    async function getNotification() {
        try {
            const res = await api.getNotification(jwtToken);
            const result = res.data.data;
            setNotifications(result);
            const _notifications = result.filter((n) => {
                return n.read === false;
            });
            if (_notifications.length > 0) {
                setBadge(1);
            }
        } catch (e) {
            if (e.response.status === 401) {
                const result = await Alerts.unauthorized();
                if (result.isConfirmed) {
                    logout();
                }
            } else {
                Alerts.serverError();
            }
        }
    }

    React.useEffect(() => {
        // eslint-disable-next-line no-undef
        const newWs = webSocket(process.env.REACT_APP_SERVER);
        setWs(newWs);
    }, []);
    React.useEffect(() => {
        if (isLogin) {
            // eslint-disable-next-line no-undef
            const newWs = webSocket(process.env.REACT_APP_SERVER);
            setWs(newWs);
            getNotification();
        }
    }, [isLogin]);

    React.useEffect(() => {
        if (ws && isLogin) {
            ws.emit('Join user id room', { userId: user.userId });
            ws.on('Update user newsfeeds', async () => {
                try {
                    await updateNewsfeeds(jwtToken);
                } catch (e) {
                    if (e.response.status === 401) {
                        const result = await Alerts.unauthorized();
                        if (result.isConfirmed) {
                            logout();
                        }
                    }
                }
            });
            ws.on('New notification', (data) => {
                setBadge(1);
            });
            ws.on('Browser read notification', (data) => {
                setBadge(0);
            });
        }
    }, [ws, isLogin]);

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
                            <FiSearchS />
                        </SearchButton>
                    </SearchBar>
                </NavigationLeft>
                <NavigationRight>
                    {isLogin ? (
                        <>
                            <CreatePost to="/create">發文</CreatePost>

                            <Badge
                                variant="dot"
                                overlap="circular"
                                color="red"
                                sx={{
                                    '& .MuiBadge-dot': {
                                        width: 15,
                                        height: 15,
                                        borderRadius: 100,
                                        backgroundColor: 'var(--red)',
                                    },
                                }}
                                badgeContent={badge}
                            >
                                <Circle
                                    id="basic-button"
                                    aria-controls={open ? 'notification-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={(e) => {
                                        handleRead(e);
                                    }}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 40,
                                                height: 40,
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
                                    <BellIcon />
                                </Circle>
                            </Badge>

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
                                <Avatar src={imageUrl(user.image)} sx={{ width: 43, height: 43 }} />
                            </Memberlink>
                        </>
                    ) : (
                        <>
                            <SignButton className="signin" to="/signin">
                                登入
                            </SignButton>
                            <SignButton className="signup" to="/signup">
                                註冊
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
                        onClick={() => logout()}
                    >
                        登出
                    </MenuItem>
                </Menu>

                <Menu
                    anchorEl={anchorEln}
                    id="notification-menu"
                    open={openN}
                    onClose={handleCloseN}
                    onClick={handleCloseN}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            width: '300px',
                            color: '#65676b',
                            fontWeight: 'bold',
                            padding: '2px 10px',
                            overflow: 'visible',
                            overflowWrap: 'anywhere',
                            borderRadius: '8px',
                            filter: 'drop-shadow(0px 1px 4px rgba(0,0,0,0.16))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 45,
                                height: 45,
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
                    {notifications.length === 0 ? (
                        <MenuItem
                            sx={{
                                height: '30px',
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                                overflow: 'clip',
                                fontWeight: 500,
                                gap: '10px',
                            }}
                        >
                            <p>暫無訊息～快去發文吧！</p>
                        </MenuItem>
                    ) : (
                        notifications.map((m) => {
                            if (m.read === false) {
                                return (
                                    <MenuItem
                                        key={m._id}
                                        onClick={() => {
                                            navigate(`/post/${m.postId}`);
                                        }}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#A4E5E0',
                                            },
                                            borderRadius: '5px',
                                            height: '68px',
                                            whiteSpace: 'normal',
                                            wordWrap: 'break-word',
                                            overflow: 'clip',
                                            fontWeight: 600,
                                            gap: '10px',
                                            backgroundColor: '#DBF5F0',
                                            color: '#4a4a4a',
                                        }}
                                    >
                                        <Avatar src={m.commenterImg} />
                                        {m.commentor.length + m.postTitle.length > 14
                                            ? `${m.commentor}在你的「${m.postTitle.slice(
                                                  0,
                                                  14 - (m.commentor.length + m.postTitle.length)
                                              )}...」留言囉！`
                                            : `${m.commentor}在你的「${m.postTitle}」留言囉！`}
                                    </MenuItem>
                                );
                            } else {
                                return (
                                    <MenuItem
                                        key={m._id}
                                        onClick={() => {
                                            navigate(`/post/${m.postId}`);
                                        }}
                                        sx={{
                                            height: '68px',
                                            whiteSpace: 'normal',
                                            wordWrap: 'break-word',
                                            overflow: 'clip',
                                            fontWeight: 400,
                                            gap: '10px',
                                            backgroundColor: 'white',
                                            borderRadius: '5px',
                                            '&:focus': {
                                                backgroundColor: 'transparent',
                                            },
                                            '&:hover': {
                                                backgroundColor: 'rgb(0 0 0 / 4%)',
                                            },
                                        }}
                                    >
                                        <Avatar src={m.commenterImg} />
                                        {m.commentor.length + m.postTitle.length > 14
                                            ? `${m.commentor}在你的「${m.postTitle.slice(
                                                  0,
                                                  14 - (m.commentor.length + m.postTitle.length)
                                              )}...」留言囉！`
                                            : `${m.commentor}在你的「${m.postTitle}」留言囉！`}
                                    </MenuItem>
                                );
                            }
                        })
                    )}
                </Menu>
            </NavigationContentWrap>
        </Navigation>
    );
};

export default Header;
