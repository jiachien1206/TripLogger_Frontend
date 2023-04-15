import React from 'react';
import styled from 'styled-components';
import Post from './Post';

const PostsWrap = styled.div`
    float: left;
`;

const PostList = ({ filter }) => {
    const [posts, setPosts] = React.useState([]);
    const fetchPosts = () => {
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
    React.useEffect(() => {
        fetchPosts();
    }, [filter]);

    return (
        <PostsWrap>
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </PostsWrap>
    );
};

export default PostList;
