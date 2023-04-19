import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api.js';
import Post from './Post.jsx';
import { Title } from '../Components.jsx';
const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    border-radius: 8px;
`;

const Posts = () => {
    const [posts, setPosts] = React.useState([]);

    const jwtToken = window.localStorage.getItem('jwtToken');
    React.useEffect(() => {
        const fetchUserPosts = async (userId, jwtToken) => {
            const res = await api.getUserPosts(userId, jwtToken);
            const userPosts = res.data.data;
            setPosts(userPosts);
        };

        const user = JSON.parse(window.localStorage.getItem('user'));
        fetchUserPosts(user.id, jwtToken);
    }, []);
    return (
        <>
            <Title>我的文章</Title>
            <Wrap>
                {posts.map((post) => {
                    return <Post key={post._id} post={post} jwtToken={jwtToken} />;
                })}
            </Wrap>
        </>
    );
};

export default Posts;
