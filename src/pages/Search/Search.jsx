import React from 'react';
import styled from 'styled-components';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import Post from './Post';

const Search = () => {
    const [posts, setPosts] = React.useState([]);
    const searchPosts = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const keyword = queryParams.get('keyword');
        const res = await api.searchPost(keyword);
        setPosts(res.data.data);
    };
    React.useEffect(() => {
        searchPosts();
    }, []);
    return (
        <>
            {posts.map((post) => (
                <Post key={post.title} post={post} />
            ))}
        </>
    );
};

export default Search;
