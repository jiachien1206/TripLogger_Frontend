import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
    margin: 0px auto 20px;
`;
const Wrap = styled.div`
    margin: auto 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;
const Name = styled.input`
    background-color: #f5f5f5;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    padding: 15px 20px;
    line-height: 20px;
    width: 300px;
    &:focus-visible {
        outline: none !important;
    }
`;

const Email = styled.input`
    background-color: #f5f5f5;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    padding: 15px 20px;
    line-height: 20px;
    width: 300px;
    &:focus-visible {
        outline: none !important;
    }
`;

const Password = styled.input`
    background-color: #f5f5f5;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    padding: 15px 20px;
    line-height: 20px;
    width: 300px;
    &:focus-visible {
        outline: none !important;
    }
`;

const EmailPwd = ({ paging, name, setName, email, setEmail, password, setPassword }) => {
    const nextPage = () => {
        paging(2);
    };
    return (
        <Wrap>
            <Title>註冊帳號</Title>
            <Name placeholder="使用者名稱" value={name} onChange={(e) => setName(e.target.value)} />
            <Email
                placeholder="電子信箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Password
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </Wrap>
    );
};

export default EmailPwd;
