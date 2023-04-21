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
    border-radius: 8px;
    background-color: #fff;
    margin: 10px auto;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const PostLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
const PostMainImg = styled.img`
    height: 250px;

    width: 650px;
    object-fit: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;
const PostTitle = styled.h2``;

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

const Post = ({ post }) => {
    const [like, setLike] = React.useState(post.like_status);
    const [likeNum, setLikeNum] = React.useState(post.like_num);
    const [readNum, setReadNum] = React.useState(post.read_num);
    const [save, setSave] = React.useState(post.save_status);

    React.useEffect(() => {
        setLike(post.like_status);
        setSave(post.save_status);
        setLikeNum(post.like_num);
    }, [post]);

    function likePost() {
        const jwtToken = window.localStorage.getItem('jwtToken');
        if (!like) {
            setLikeNum(function (prev) {
                return prev + 1;
            });
            api.likePost(post._id, post.location.continent, post.type, true, jwtToken);
            // updateLocalStorage(1, 'like');
        } else {
            setLikeNum(function (prev) {
                return prev - 1;
            });
            api.likePost(post._id, post.location.continent, post.type, false, jwtToken);
            // updateLocalStorage(0, 'like');
        }
        setLike(!like);
    }
    function savePost() {
        const jwtToken = window.localStorage.getItem('jwtToken');
        if (!save) {
            api.savePost(post._id, post.location.continent, post.type, true, jwtToken);
            // updateLocalStorage(1, 'save');
        } else {
            api.savePost(post._id, post.location.continent, post.type, false, jwtToken);
            // updateLocalStorage(0, 'save');
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
