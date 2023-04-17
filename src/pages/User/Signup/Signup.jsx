import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api.js';
import EmailPwd from './EmailPwd';
import Location from './Location';
import Tag from './Tag';
import updateNewsfeeds from '../../../utils/updateUserNewsfeeds.js';

const SignupWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    padding: 20px;
    width: 500px;
    height: 500px;
    border: 1px solid #000000;
    background-color: #ffffff;
`;

const Signup = () => {
    const [page, setPage] = React.useState(1);

    async function signup(name, email, password) {
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
                {page === 1 ? (
                    <EmailPwd paging={setPage}></EmailPwd>
                ) : page === 2 ? (
                    <Location paging={setPage}></Location>
                ) : (
                    <Tag submit={signup}></Tag>
                )}
            </SignupWrap>
        </>
    );
};

export default Signup;
