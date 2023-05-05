import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api.js';
import { Title } from '../Components.jsx';
import { Link } from 'react-router-dom';

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

const Buttons = styled.div`
    display: flex;
    gap: 30px;
`;

const Save = () => {
    const [savedPosts, setSavedPosts] = React.useState([]);

    React.useEffect(() => {
        const getSavedPosts = async () => {
            const user = JSON.parse(window.localStorage.getItem('user'));
            const postsIds = JSON.parse(window.localStorage.getItem('savedPosts'));
            const jwtToken = window.localStorage.getItem('jwtToken');
            const res = await api.getUserSavedPosts(user.id, postsIds, jwtToken);
            const posts = res.data.data;
            setSavedPosts(posts);
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
