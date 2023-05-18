import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api.js';
import { Title } from '../Components.jsx';
import { Link } from 'react-router-dom';
import { Alerts } from '../../../utils/alerts.js';
import { AuthContext } from '../../../context/authContext';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 15px;
`;

const Post = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #efefef;
    background-color: #ffffff;
    height: 90px;
    width: 100%;
    padding: 10px 30px;
    text-decoration: none;
    word-break: break-word;
    &:hover {
        background-color: #efefef;
    }
    gap: 40px;
    &:first-child {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
    &:last-child {
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-bottom: none;
    }
`;

const PostTitle = styled.div`
    font-size: 18px;
    cursor: pointer;
    color: var(--dark-green);
    font-weight: 500;
`;

const Save = () => {
    const { jwtToken, logout } = React.useContext(AuthContext);
    const [savedPosts, setSavedPosts] = React.useState([]);

    React.useEffect(() => {
        const getSavedPosts = async () => {
            try {
                const user = JSON.parse(window.localStorage.getItem('user'));
                const postsIds = JSON.parse(window.localStorage.getItem('savedPosts'));
                const res = await api.getUserSavedPosts(user.userId, postsIds, jwtToken);
                const posts = res.data.data;
                setSavedPosts(posts);
            } catch (e) {
                if (e.response.status === 401) {
                    const result = await Alerts.unauthorized();
                    if (result.isConfirmed) {
                        logout();
                    }
                } else {
                    Alerts.serverError();
                }
            }
        };

        getSavedPosts();
    }, []);
    return (
        <>
            <Title>我的收藏</Title>
            <Wrap>
                {savedPosts.map((post) => {
                    return (
                        <Post to={`/post/${post._id}`} key={post._id}>
                            <PostTitle>{post.title}</PostTitle>
                        </Post>
                    );
                })}
            </Wrap>
        </>
    );
};

export default Save;
