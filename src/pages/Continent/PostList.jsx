import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import api from '../../utils/api';

const PostsWrap = styled.div`
    margin-top: 60px;
`;

const PostList = ({ continent }) => {
    const [posts, setPosts] = React.useState([]);
    const fetchPosts = async () => {
        const res = await api.getContinentPosts(continent);
        const posts = res.data.data;
        if (posts) {
            setPosts(posts);
        }
    };
    React.useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <PostsWrap>
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </PostsWrap>
    );
};

export default PostList;
