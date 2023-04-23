import React from 'react';
import styled from 'styled-components';
import Post from '../../components/Post';
import { AuthContext } from '../../context/authContext';

const PostsWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const PostList = ({ filter }) => {
    const [posts, setPosts] = React.useState([]);
    const [likedPosts, setLikedPosts] = React.useState([]);
    const [savedPosts, setSavedPosts] = React.useState([]);
    const { isLogin } = React.useContext(AuthContext);
    const getPosts = () => {
        let posts;
        if (filter === '為你推薦') {
            posts = window.localStorage.getItem('relevantPosts');
        } else if (filter === '熱門文章') {
            posts = window.localStorage.getItem('topPosts');
        } else if (filter === '最新文章') {
            posts = window.localStorage.getItem('newPosts');
        }
        posts = JSON.parse(posts);
        if (posts) {
            setPosts(posts);
        }
    };
    const getLikedPosts = () => {
        const posts = window.localStorage.getItem('likedPosts');
        setLikedPosts(JSON.parse(posts));
    };

    const getSavedPosts = () => {
        const posts = window.localStorage.getItem('savedPosts');
        setSavedPosts(JSON.parse(posts));
    };
    React.useEffect(() => {
        getPosts();
        if (isLogin) {
            getLikedPosts();
            getSavedPosts();
        }
    }, [filter]);

    return (
        <PostsWrap>
            {posts.map((post) => (
                <Post key={post._id} post={post} likedPosts={likedPosts} savedPosts={savedPosts} />
            ))}
        </PostsWrap>
    );
};

export default PostList;
