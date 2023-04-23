import React from 'react';
import styled from 'styled-components';
import Post from '../../components/Post';
import api from '../../utils/api';

const PostsWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const PostList = ({ posts }) => {
    const [likedPosts, setLikedPosts] = React.useState([]);
    const [savedPosts, setSavedPosts] = React.useState([]);

    const getLikedPosts = () => {
        const posts = window.localStorage.getItem('likedPosts');
        setLikedPosts(JSON.parse(posts));
    };

    const getSavedPosts = () => {
        const posts = window.localStorage.getItem('savedPosts');
        setSavedPosts(JSON.parse(posts));
    };
    React.useEffect(() => {
        getLikedPosts();
        getSavedPosts();
    }, [posts]);

    return (
        <PostsWrap>
            {posts.map((post) => (
                <Post key={post._id} post={post} likedPosts={likedPosts} savedPosts={savedPosts} />
            ))}
        </PostsWrap>
    );
};

export default PostList;
