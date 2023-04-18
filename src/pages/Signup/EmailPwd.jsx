import React from 'react';
import styled from 'styled-components';
import { Title } from './Components.jsx';
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

const NextPage = styled.button``;

const EmailPwd = ({ paging, name, setName, email, setEmail, password, setPassword }) => {
    const nextPage = () => {
        paging(2);
    };
    return (
        <>
            <Title>註冊會員</Title>
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
            <NextPage onClick={nextPage}>Next</NextPage>
        </>
    );
};

export default EmailPwd;
