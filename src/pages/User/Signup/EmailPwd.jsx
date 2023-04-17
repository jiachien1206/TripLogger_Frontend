import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api.js';
const Title = styled.div``;
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

const EmailPwd = ({ paging }) => {
    const [name, setName] = React.useState('Signup測試員');
    const [email, setEmail] = React.useState('admin@gmail.com');
    const [password, setPassword] = React.useState('adminadmin');

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
