import React, { useEffect } from 'react';
import styled from 'styled-components';
import api from '../../utils/api.js';
import { Link } from 'react-router-dom';
import thumbR from '../../images/thumbs-up-regular.svg';
import thumbS from '../../images/thumbs-up-solid.svg';
import saveR from '../../images/bookmark-regular.svg';
import saveS from '../../images/bookmark-solid.svg';
import eye from '../../images/eye.svg';

const PostWrap = styled.div`
    border: 1px solid #929292;
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;
    margin: 10px auto;
    max-width: 800px;
`;

const PostLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
const PostMainImg = styled.img`
    width: 100%;
`;
const PostTitle = styled.div`
    font-size: 24px;
`;

const ReadIcon = styled.div`
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-image: url(${eye});
`;

const ReadNum = styled.div``;

const PostContinent = styled.div`
    font-size: 20px;
`;

const PostCountry = styled.div`
    font-size: 20px;
`;

const PostType = styled.div`
    font-size: 20px;
`;

const PostAuthor = styled.div`
    font-size: 20px;
`;

const PostContent = styled.div`
    font-size: 14px;

    & img {
        max-width: 100%;
    }
`;

const PostTime = styled.div`
    font-size: 14px;
`;
const Bottom = styled.div`
    display: flex;
    gap: 10px;
    margin: 10px 0px;
    cursor: pointer;
`;
const LikeButton = styled.div`
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-image: url(${thumbR});
`;
const LikedButton = styled.div`
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-image: url(${thumbS});
`;

const LikeNum = styled.div`
    width: 30px;
`;

const SaveButton = styled.div`
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-image: url(${saveR});
`;

const SavedButton = styled.div`
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-image: url(${saveS});
`;

const Post = ({ post, likedPosts, savedPosts }) => {
    const [like, setLike] = React.useState(false);
    const [likeNum, setLikeNum] = React.useState(0);
    const [readNum, setReadNum] = React.useState(0);
    const [save, setSave] = React.useState(false);

    const matchPostStatus = async () => {
        const res = await api.getPostNumbers(post._id);
        const { read_num, like_num } = res.data.data;
        setReadNum(read_num);
        setLikeNum(like_num);
        if (likedPosts.includes(post._id)) {
            setLike(true);
        }
        if (savedPosts.includes(post._id)) {
            setSave(true);
        }
    };

    React.useEffect(() => {
        matchPostStatus();
    }, [post]);

    // function updateLocalStorage(status, type) {
    //     const relevantPosts = window.localStorage.getItem('relevantPosts');
    //     const relevantPostsResult = JSON.parse(relevantPosts).map((p) => {
    //         if (p._id === post._id) {
    //             p[`${type}_status`] = status;
    //             if (status) {
    //                 p[`${type}_num`] += 1;
    //             } else {
    //                 p[`${type}_num`] -= 1;
    //             }
    //         }
    //         return p;
    //     });
    //     window.localStorage.setItem('relevantPosts', JSON.stringify(relevantPostsResult));

    //     const topPosts = window.localStorage.getItem('topPosts');
    //     const topPostsResult = JSON.parse(topPosts).map((p) => {
    //         if (p._id === post._id) {
    //             p[`${type}_status`] = status;
    //             if (status) {
    //                 p[`${type}_num`] += 1;
    //             } else {
    //                 p[`${type}_num`] -= 1;
    //             }
    //         }
    //         return p;
    //     });
    //     window.localStorage.setItem('topPosts', JSON.stringify(topPostsResult));
    //     const newPosts = window.localStorage.getItem('newPosts');
    //     const newPostsResult = JSON.parse(newPosts).map((p) => {
    //         if (p._id === post._id) {
    //             p[`${type}_status`] = status;
    //             if (status) {
    //                 p[`${type}_num`] += 1;
    //             } else {
    //                 p[`${type}_num`] -= 1;
    //             }
    //         }
    //         return p;
    //     });
    //     window.localStorage.setItem('newPosts', JSON.stringify(newPostsResult));
    // }

    function likePost() {
        const jwtToken = window.localStorage.getItem('jwtToken');
        let localStorageLikedPosts = window.localStorage.getItem('likedPosts');
        localStorageLikedPosts = JSON.parse(localStorageLikedPosts);
        if (!like) {
            setLikeNum(function (prev) {
                return prev + 1;
            });
            api.likePost(post._id, post.location.continent, post.type, true, jwtToken);
            localStorageLikedPosts.push(post._id);
            window.localStorage.setItem('likedPosts', JSON.stringify(localStorageLikedPosts));
        } else {
            setLikeNum(function (prev) {
                return prev - 1;
            });
            api.likePost(post._id, post.location.continent, post.type, false, jwtToken);
            const newLocalStorageLikedPosts = localStorageLikedPosts.filter((p) => {
                if (p !== post._id) {
                    return true;
                }
                return false;
            });
            window.localStorage.setItem('likedPosts', JSON.stringify(newLocalStorageLikedPosts));
        }

        setLike(!like);
    }
    function savePost() {
        const jwtToken = window.localStorage.getItem('jwtToken');
        const localStorageSavedPosts = JSON.parse(window.localStorage.getItem('savedPosts'));
        if (!save) {
            api.savePost(post._id, post.location.continent, post.type, true, jwtToken);
            localStorageSavedPosts.push(post._id);
            window.localStorage.setItem('savedPosts', JSON.stringify(localStorageSavedPosts));
        } else {
            api.savePost(post._id, post.location.continent, post.type, false, jwtToken);
            const newLocalStorageSavedPosts = localStorageSavedPosts.filter((p) => {
                if (p !== post._id) {
                    return true;
                }
                return false;
            });
            window.localStorage.setItem('savedPosts', JSON.stringify(newLocalStorageSavedPosts));
        }
        setSave(!save);
    }
    return (
        <PostWrap>
            <PostLink to={`/post/${post._id}`}>
                <PostMainImg src={post.main_image}></PostMainImg>
                <PostTitle>{post.title}</PostTitle>
                <ReadIcon />
                <ReadNum>{readNum}</ReadNum>
                <PostContinent>{post.location.continent}</PostContinent>
                <PostCountry>{post.location.country}</PostCountry>
                <PostType>{post.type}</PostType>
                <PostAuthor>{post.authorId}</PostAuthor>
                <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
                <PostTime>{post.dates.post_date}</PostTime>
            </PostLink>
            <Bottom>
                {like ? <LikedButton onClick={likePost} /> : <LikeButton onClick={likePost} />}
                <LikeNum>{likeNum}</LikeNum>
                {save ? <SavedButton onClick={savePost} /> : <SaveButton onClick={savePost} />}
            </Bottom>
        </PostWrap>
    );
};
export default Post;
