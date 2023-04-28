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
const Wrap = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    z-index: 100;
    position: fixed;
    top: 0;
`;

const Title = styled.div`
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

const Signin = () => {
    const { isLogin, saveUserData } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    async function signin() {
        try {
            if (!isValidEmail(email) || password.length < 8) {
                return alert('帳號或密碼輸入錯誤');
            }
            const res = await api.signin({
                email,
                password,
            });
            const { user, accessToken } = res.data.data;
            const userData = { id: user._id, name: user.name, image: user.image };
            window.localStorage.setItem('jwtToken', accessToken);
            window.localStorage.setItem('user', JSON.stringify(userData));
            await updateNewsfeeds(accessToken);
            userData['jwtToken'] = accessToken;
            await saveUserData(userData);
            window.location.href = '/';
        } catch (e) {
            console.log(e);
            alert('帳號或密碼輸入錯誤');
        }
    }

    if (isLogin) return <Navigate to="/" />;

    return (
        <Wrap>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                // onClose={handleClose}
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
                        <Title>Welcome</Title>
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
                        />
                        <Button
                            variant="contained"
                            sx={{ width: '100px', margin: '20px auto' }}
                            disableElevation
                            onClick={signin}
                        >
                            登入
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </Wrap>
    );
};

export default Signin;
