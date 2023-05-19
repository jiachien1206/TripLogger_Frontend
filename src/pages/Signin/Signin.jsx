import React from 'react';
import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../../utils/api.js';
import updateNewsfeeds from '../../utils/updateUserNewsfeeds.js';
import { AuthContext } from '../../context/authContext';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Alerts, Toast } from '../../utils/alerts';

const Wrap = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    z-index: 100;
    position: fixed;
    top: 0;
`;

const Title = styled.div`
    color: var(--primary-font);
    font-size: 24px;
    margin: 15px auto;
    font-weight: bold;
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#ffffff',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
    color: '#050505',
    fontWeight: 500,
    fontSize: '18px',
    cursor: 'default',
    padding: '40px 70px',
    justifyContent: 'center',
};

const Email = styled.input`
    color: var(--primary-font);
    background-color: #f5f5f5;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    padding: 15px 20px;
    width: 300px;
    &:focus-visible {
        outline: none !important;
    }
`;

const Password = styled.input`
    color: var(--primary-font);
    background-color: #f5f5f5;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    padding: 15px 20px;
    width: 300px;
    &:focus-visible {
        outline: none !important;
    }
`;

const ButtonsWrap = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
`;

const Signin = () => {
    const { isLogin, login } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('triplogger1@gmail.com');
    const [password, setPassword] = React.useState('triplogger');
    const navigate = useNavigate();

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    async function signin() {
        try {
            if (!isValidEmail(email) || password.length < 8) {
                return Alerts.signinFailed();
            }
            const res = await api.signin({
                email,
                password,
            });
            Toast.signinSuccess();
            const { user, accessToken } = res.data.data;
            const userData = { userId: user._id, name: user.name, image: user.image };
            window.localStorage.setItem('jwtToken', accessToken);
            window.localStorage.setItem('user', JSON.stringify(userData));
            await updateNewsfeeds(accessToken);
            userData['jwtToken'] = accessToken;
            login(userData);
        } catch (e) {
            if (e.response.status === 401) {
                Alerts.signinFailed();
            } else {
                Alerts.serverError();
            }
        }
    }

    React.useEffect(() => {
        if (isLogin === true) {
            navigate('/');
        }
    }, [isLogin]);

    if (isLogin) return <Navigate to="/" />;

    return (
        <Wrap>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Title>登入 TripLogger</Title>
                        <Email
                            placeholder="電子信箱"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <Password
                            placeholder="密碼"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                        <ButtonsWrap>
                            <Button
                                variant="outlined"
                                sx={{ width: '100px', margin: '20px 0px 10px' }}
                                disableElevation
                                onClick={() => navigate(-1)}
                            >
                                取消
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: '100px', margin: '20px 0px 10px' }}
                                disableElevation
                                onClick={signin}
                            >
                                登入
                            </Button>
                        </ButtonsWrap>
                    </Box>
                </Fade>
            </Modal>
        </Wrap>
    );
};

export default Signin;
