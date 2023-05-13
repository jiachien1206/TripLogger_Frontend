import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api.js';
import Post from './Post.jsx';
import { Title } from '../Components.jsx';
import { AuthContext } from '../../../context/authContext';
import { Alerts } from '../../../utils/alerts.js';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 15px;
`;

const Posts = () => {
    const { jwtToken, logout } = React.useContext(AuthContext);
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        const fetchUserPosts = async (userId) => {
            try {
                const res = await api.getUserPosts(userId);
                const userPosts = res.data.data;
                setPosts(userPosts);
            } catch (e) {
                if (e.response.status === 401) {
                    Alerts.unauthorized().then((result) => {
                        if (result.isConfirmed) {
                            logout();
                        }
                    });
                } else {
                    Alerts.serverError();
                }
            }
        };

        const user = JSON.parse(window.localStorage.getItem('user'));
        fetchUserPosts(user.id);
    }, []);
    return (
        <>
            <Title>我的文章</Title>
            <Wrap>
                {posts.map((post) => {
                    return <Post key={post._id} post={post} />;
                })}
            </Wrap>
        </>
    );
};

export default Posts;
