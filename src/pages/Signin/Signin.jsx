import React from 'react';
import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../../utils/api.js';
import updateNewsfeeds from '../../utils/updateUserNewsfeeds.js';
import { AuthContext } from '../../context/authContext';

const SigninWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    padding: 20px;
    width: 500px;
    height: 500px;
    border: 1px solid #000000;
`;

const Email = styled.input`
    line-height: 20px;
    width: 300px;
    margin: 10px;
`;

const Password = styled.input`
    line-height: 20px;
    width: 300px;
    margin: 10px;
`;

const Submit = styled.button``;

const Signin = () => {
    const { isLogin, saveUserData } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('chatgpt1@gmail.com');
    const [password, setPassword] = React.useState('chatchat');
    const navigate = useNavigate();

    async function signin() {
        try {
            console.log(isLogin);
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
            saveUserData(userData);
            navigate('/');
        } catch (e) {
            console.log(e);
            alert('登入失敗');
        }
    }

    if (isLogin) return <Navigate to="/" replace />;

    return (
        <>
            <SigninWrap>
                <label>
                    E-mail:
                    <Email value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <Submit onClick={signin}>送出</Submit>
            </SigninWrap>
        </>
    );
};

export default Signin;
