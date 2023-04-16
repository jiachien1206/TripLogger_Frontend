import React from 'react';
import styled from 'styled-components';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import Post from './Post';

const Search = () => {
    const [posts, setPosts] = React.useState([]);
    const [keyword, setKeyword] = React.useState('');
    const searchPosts = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const word = queryParams.get('keyword');
        setKeyword(word);
        const res = await api.searchPost(word);
        setPosts(res.data.data);
    };
    React.useEffect(() => {
        searchPosts();
    }, []);
    return (
        <>
            {posts.map((post) => (
                <Post key={post.title} post={post} keyword={keyword} />
            ))}
        </>
    );
};

export default Search;
