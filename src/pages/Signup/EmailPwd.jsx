import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import api from '../../utils/api';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const Title = styled.div`
    margin: 0px auto 20px;
`;
const Wrap = styled.div`
    margin: auto 0px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const InputWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 40px;
`;
const Name = styled.input`
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

const EmailWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

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

const Placeholder = styled.div`
    width: 20px;
    height: 20px;
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

const EmailPwd = ({ setInputStatus, name, setName, email, setEmail, password, setPassword }) => {
    const [emailPass, setEmailPass] = React.useState(false);
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    const verifyEmail = async (e) => {
        setEmail(e.target.value);
        if (isValidEmail(e.target.value)) {
            setTimeout(async () => {
                const res = await api.checkUser({ email: e.target.value });
                if (!res.error) {
                    setEmailPass(true);
                    if (password.length > 7) {
                        setInputStatus(true);
                    }
                } else {
                    setEmailPass(false);
                    setInputStatus(false);
                }
            }, 700);
        } else {
            setEmailPass(false);
            setInputStatus(false);
        }
    };

    const verifyInputs = async (e) => {
        setPassword(e.target.value);

        if (emailPass === true && e.target.value.length > 7) {
            setInputStatus(true);
        } else {
            setInputStatus(false);
        }
    };

    return (
        <Wrap>
            <Title>註冊帳號</Title>
            <InputWrap>
                <Name
                    placeholder="使用者名稱"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <EmailWrap>
                    <Email
                        placeholder="電子信箱"
                        value={email}
                        onChange={(e) => {
                            verifyEmail(e);
                        }}
                    />
                    {emailPass ? <CheckCircleRoundedIcon color="primary" /> : <Placeholder />}
                </EmailWrap>
                <Password
                    placeholder="密碼 (最少7個字元)"
                    value={password}
                    onChange={(e) => verifyInputs(e)}
                />
            </InputWrap>
        </Wrap>
    );
};

export default EmailPwd;
