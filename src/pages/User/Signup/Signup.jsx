import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api.js';
import updateNewsfeeds from '../../../utils/updateUserNewsfeeds.js';

const SignupWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    padding: 20px;
    width: 500px;
    height: 500px;
    border: 1px solid #000000;
`;

const Name = styled.input`
    line-height: 20px;
    width: 300px;
    margin: 10px;
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

const Signup = () => {
    const [name, setName] = React.useState('Signup測試員');
    const [email, setEmail] = React.useState('admin@gmail.com');
    const [password, setPassword] = React.useState('adminadmin');

    async function signup() {
        try {
            const res = await api.signup({
                name,
                email,
                password,
            });
            const { user, accessToken } = res.data.data;
            const userData = { id: user._id, name: user.name };
            window.localStorage.setItem('jwtToken', accessToken);
            window.localStorage.setItem('user', JSON.stringify(userData));
            await api.createUserNewsfeed(accessToken);
            await updateNewsfeeds(accessToken);
            window.location.replace('/');
        } catch (e) {
            console.log(e);
            alert('註冊失敗');
        }
    }

    return (
        <>
            <SignupWrap>
                <label>
                    Name:
                    <Name value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    E-mail:
                    <Email value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <Submit onClick={signup}>送出</Submit>
            </SignupWrap>
        </>
    );
};

export default Signup;
