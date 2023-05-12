import React from 'react';
import styled from 'styled-components';
import Post from '../../components/Post';
import { AuthContext } from '../../context/authContext';
import api from '../../utils/api';
import updateNewsfeeds from '../../utils/updateUserNewsfeeds';
import { Alerts } from '../../utils/alerts.js';

const PostsWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const PostList = ({ setPostNum, filter, setPage, page }) => {
    const [posts, setPosts] = React.useState([]);
    const [likedPosts, setLikedPosts] = React.useState([]);
    const [savedPosts, setSavedPosts] = React.useState([]);
    const { isLogin, jwtToken, logout } = React.useContext(AuthContext);
    const getPosts = async (page) => {
        try {
            let pagePosts;
            if (filter === '為你推薦') {
                let allPostIds = window.localStorage.getItem('relevantPosts');
                if (!allPostIds) {
                    await updateNewsfeeds(jwtToken);
                    allPostIds = window.localStorage.getItem('relevantPosts');
                }
                const postIdsArr = JSON.parse(allPostIds);
                setPostNum(Math.ceil(postIdsArr.length / 10));
                const pagePostIds = postIdsArr.slice((page - 1) * 10, page * 10);
                const postIdsStr = pagePostIds.toString();
                const res = await api.getPosts(postIdsStr);
                pagePosts = res.data.data;
            } else if (filter === '熱門文章') {
                const res = await api.getTopPosts(page);
                pagePosts = res.data.data.posts;
                const postNum = res.data.data.postsNum;
                setPostNum(Math.ceil(postNum / 10));
            } else if (filter === '最新文章') {
                const res = await api.getNewPosts(page);
                pagePosts = res.data.data.posts;
                const postNum = res.data.data.postsNum;
                setPostNum(Math.ceil(postNum / 10));
            }
            setPosts(pagePosts);
        } catch (e) {
            Alerts.serverError().then((result) => {
                if (result.isConfirmed) {
                    logout();
                }
            });
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
        if (isLogin) {
            getLikedPosts();
            getSavedPosts();
        }
    }, []);

    React.useEffect(() => {
        getPosts(1);
        setPage(1);
    }, [filter]);

    React.useEffect(() => {
        getPosts(page);
    }, [page]);

    return (
        <PostsWrap>
            {posts &&
                posts.map((post) => (
                    <Post
                        key={post._id}
                        post={post}
                        likedPosts={likedPosts}
                        savedPosts={savedPosts}
                    />
                ))}
        </PostsWrap>
    );
};

export default PostList;
