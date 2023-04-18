import React from 'react';
import styled from 'styled-components';
import api from '../../utils/api.js';
import updateNewsfeeds from '../../utils/updateUserNewsfeeds.js';
import EmailPwd from './EmailPwd.jsx';
import Location from './Location.jsx';
import Tag from './Type.jsx';

const SignupWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    padding: 20px;
    width: 500px;
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
    const [name, setName] = React.useState('小chat同學');
    const [email, setEmail] = React.useState('chatgpt@gmail.com');
    const [password, setPassword] = React.useState('chatchat');
    const [page, setPage] = React.useState(1);
    const [locations, setlocations] = React.useState([
        '亞洲',
        '歐洲',
        '北美洲',
        '大洋洲',
        '南美洲',
        '非洲',
        '南極洲',
    ]);
    const [tags, setTags] = React.useState([
        '交通',
        '住宿',
        '景點',
        '證件',
        '其他',
        '恐怖故事',
        '省錢妙招',
    ]);

    async function signup() {
        try {
            const res = await api.signup({
                name,
                email,
                password,
                location_pre: locations,
                tag_pre: tags,
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
                    <EmailPwd
                        paging={setPage}
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    ></EmailPwd>
                ) : page === 2 ? (
                    <Location
                        locations={locations}
                        setLocations={setlocations}
                        paging={setPage}
                    ></Location>
                ) : (
                    <Tag tags={tags} setTags={setTags} submit={signup}></Tag>
                )}
            </SignupWrap>
        </>
    );
};

export default Signup;
