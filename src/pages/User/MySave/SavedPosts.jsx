import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api.js';
import { Title } from '../Components.jsx';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    border-radius: 8px;
`;

const Post = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #efefef;
    background-color: #ffffff;
    height: 90px;
    width: 100%;
    padding: 10px 30px;
    &:hover {
        background-color: #efefef;
    }
    gap: 40px;
`;

const PostTitle = styled(Link)`
    font-size: 18px;
    cursor: pointer;
    color: #236262;
    text-decoration: none;
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
                        <Post key={post._id}>
                            <PostTitle to={`/post/${post._id}`}>{post.title}</PostTitle>
                        </Post>
                    );
                })}
            </Wrap>
        </>
    );
};

export default Save;
