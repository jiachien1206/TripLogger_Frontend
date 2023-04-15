import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api.js';
import Post from './Post';

const Wrapper = styled.div`
    margin: 50px auto 0px;
    width: 1050px;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 5px;
    background-color: #ffffff;
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
        <Wrapper>
            <h2>我的文章</h2>
            {posts.map((post) => {
                return <Post key={post._id} post={post} jwtToken={jwtToken} />;
            })}
        </Wrapper>
    );
};

export default Posts;
