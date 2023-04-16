import React from 'react';
import styled from 'styled-components';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import Post from './Post';
const Wrapper = styled.div`
    margin: 50px auto;
`;
const NoResult = styled.div``;

const Search = () => {
    const [posts, setPosts] = React.useState([]);
    const [keyword, setKeyword] = React.useState('');
    const [result, setResult] = React.useState(true);
    const searchPosts = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const word = queryParams.get('keyword');
        setKeyword(word);
        const res = await api.searchPost(word);
        const postList = res.data.data;
        if (postList.length === 0) {
            setResult(false);
        }
        setPosts(postList);
    };
    React.useEffect(() => {
        searchPosts();
    }, []);
    return (
        <Wrapper>
            {result ? (
                posts.map((post) => <Post key={post.title} post={post} keyword={keyword} />)
            ) : (
                <NoResult>無搜尋結果</NoResult>
            )}
        </Wrapper>
    );
};

export default Search;
