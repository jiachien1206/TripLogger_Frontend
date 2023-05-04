import React from 'react';
import styled from 'styled-components';
import api from '../../utils/api';
import Post from './Post';
import LeftSidebar from '../../components/LeftSidebar';

const SearchWrap = styled.div`
    margin: 100px 0px 50px 32%;
    width: 50%;
    min-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 24px;
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
        <>
            <LeftSidebar></LeftSidebar>
            <SearchWrap>
                {result ? (
                    posts.map((post) => <Post key={post._id} post={post} keyword={keyword} />)
                ) : (
                    <NoResult>無搜尋結果</NoResult>
                )}
            </SearchWrap>
        </>
    );
};

export default Search;
