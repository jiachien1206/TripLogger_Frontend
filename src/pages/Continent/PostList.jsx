import React from 'react';
import styled from 'styled-components';
import Post from '../../components/Post';
import api from '../../utils/api';

const PostsWrap = styled.div`
    margin-top: 10px;
`;

const PostList = ({ posts }) => {
    return (
        <PostsWrap>
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </PostsWrap>
    );
};

export default PostList;
