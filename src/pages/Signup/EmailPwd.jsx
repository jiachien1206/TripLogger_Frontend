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

const RowlWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Email = styled.input`
    background-color: #f5f5f5;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    padding: 15px 55px 15px 20px;
    width: 300px;
    &:focus-visible {
        outline: none !important;
    }
`;

const CheckCircle = styled(CheckCircleRoundedIcon)`
    position: absolute;
    right: 20px;
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
    const [namePass, setNamePass] = React.useState(false);
    const [emailPass, setEmailPass] = React.useState(false);
    const [pwdPass, setPwdPass] = React.useState(false);
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const verifyName = (name) => {
        if (name !== '') {
            setNamePass(true);
        } else {
            setNamePass(false);
        }
    };
    const verifyEmail = async (email) => {
        if (isValidEmail(email)) {
            setTimeout(async () => {
                const res = await api.checkUser({ email });
                if (!res.error) {
                    setEmailPass(true);
                } else {
                    setEmailPass(false);
                }
            }, 700);
        } else {
            setEmailPass(false);
        }
    };

    const verifyPassword = (password) => {
        if (password.length > 7) {
            setPwdPass(true);
        } else {
            setPwdPass(false);
        }
    };
    React.useEffect(() => {
        verifyName(name);
        verifyEmail(email);
        verifyPassword(password);
    }, []);

    React.useEffect(() => {
        if (namePass && emailPass && pwdPass) {
            setInputStatus(true);
        } else {
            setInputStatus(false);
        }
    }, [namePass, emailPass, pwdPass]);

    return (
        <Wrap>
            <Title>註冊帳號</Title>
            <InputWrap>
                <RowlWrap>
                    <Name
                        placeholder="使用者名稱"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            verifyName(name);
                        }}
                    />
                    {namePass && <CheckCircle color="primary" />}
                </RowlWrap>
                <RowlWrap>
                    <Email
                        placeholder="電子信箱"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            verifyEmail(email);
                        }}
                    />
                    {emailPass && <CheckCircle color="primary" />}
                </RowlWrap>
                <RowlWrap>
                    <Password
                        placeholder="密碼 (最少7個字元)"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            verifyPassword(password);
                        }}
                    />
                    {pwdPass && <CheckCircle color="primary" />}
                </RowlWrap>
            </InputWrap>
        </Wrap>
    );
};

export default EmailPwd;
