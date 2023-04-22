import React from 'react';
import styled from 'styled-components';
import api from '../utils/api.js';
import { Link } from 'react-router-dom';
import thumbR from '../images/thumbs-up-regular.svg';
import thumbS from '../images/thumbs-up-solid.svg';
import Avatar from '@mui/material/Avatar';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import Reactions from './Reaction';
import reactions from '../images/reactions.png';

const PostWrap = styled.div`
    border-radius: 8px;
    background-color: #fff;
    margin: 10px auto;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    width: 650px;
    cursor: default;
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

const Buttom = styled.div`
    padding: 18px 20px 0px;
`;

const Upper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Author = styled.div`
    display: flex;
    align-items: center;
    gap: 11px;
`;

const Info = styled.div``;

const AuthorName = styled.div`
    font-size: 14px;
    font-weight: 500;
`;

const Location = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    color: #65676b;
    font-size: 15px;
    margin-right: 30px;
`;

const PostType = styled.div``;

const ContentWrap = styled.div`
    margin: 20px 41px 10px;
`;
const PostTitle = styled.h2`
    margin-bottom: 10px;
    &:hover {
        color: #236262;
    }
`;

const PostContent = styled.div`
    font-size: 15px;
    height: 60px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-bottom: 15px;
`;

const PostTime = styled.div`
    font-size: 12px;
    color: #65676b;
`;
const Numbers = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;
    cursor: pointer;
    border-bottom: 1px solid #c0c0c0;
    font-size: 14px;
    color: #65676b;
    justify-content: space-between;
    margin: 25px 41px 0px;
`;
const NumbersLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
const NumbersRight = styled.div`
    display: flex;
    gap: 10px;
`;
const ReadNum = styled.div``;

const CommentNum = styled.div``;

const LikeIcon = styled.img`
    height: 23px;
`;
const LikeNum = styled.div`
    width: 30px;
`;

const Buttons = styled.div`
    margin: 0px 61px;
    padding: 5px 0px;
    display: flex;
    align-items: center;
    font-size: 15px;
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 33.33%;
    height: 34px;
    transition: background-color 0.2s;
    cursor: pointer;
    color: #65676b;
    &:hover {
        background-color: #ebeff0;
        border-radius: 4px;
    }
    &.active {
        color: #236262;
    }
`;

const CommentButton = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 33.33%;
    height: 34px;
    transition: background-color 0.2s;
    cursor: pointer;
    color: #65676b;
    text-decoration: none;
    &:hover {
        background-color: #ebeff0;
        border-radius: 4px;
    }
`;

const LikeButtonIcon = styled.div`
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-image: url(${thumbR});
    filter: invert(41%) sepia(6%) saturate(315%) hue-rotate(182deg) brightness(93%) contrast(84%);
`;

const LikedButtonIcon = styled.div`
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-image: url(${thumbS});
    filter: invert(29%) sepia(87%) saturate(293%) hue-rotate(131deg) brightness(94%) contrast(94%);
`;

const Post = ({ post, likedPosts, savedPosts }) => {
    const [like, setLike] = React.useState(false);
    const [likeNum, setLikeNum] = React.useState(0);
    const [readNum, setReadNum] = React.useState(0);
    const [commentNum, setCommentNum] = React.useState(0);
    const [save, setSave] = React.useState(false);
    const [isHover, setIsHover] = React.useState(false);
    const utcDate = new Date(post.dates.post_date);
    const dateTime = utcDate.toLocaleString();
    const [date] = dateTime.split(' ');

    const matchPostStatus = async () => {
        const res = await api.getPostNumbers(post._id);
        const { read_num, like_num, comment_num } = res.data.data;
        setReadNum(read_num);
        setLikeNum(like_num);
        setCommentNum(comment_num);
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

                <Buttom>
                    <Upper>
                        <Author>
                            <Avatar
                                src={post.authorId.image}
                                sx={{ width: 32, height: 32 }}
                            ></Avatar>
                            <Info>
                                <AuthorName>{post.authorId.name}</AuthorName>
                                <PostTime>{date}</PostTime>
                            </Info>
                        </Author>
                        <Location>
                            <LocationOnRoundedIcon color="primary" />
                            {post.location.continent} | {post.location.country}
                            <PostType>#{post.type}</PostType>
                        </Location>
                    </Upper>

                    <ContentWrap>
                        <PostTitle>{post.title}</PostTitle>
                        <PostContent>{post.content.replace(/(<([^>]+)>)/gi, '')}</PostContent>
                    </ContentWrap>

                    <Numbers>
                        <NumbersLeft>
                            <LikeIcon src={reactions}></LikeIcon>
                            <LikeNum>{likeNum}</LikeNum>
                        </NumbersLeft>
                        <NumbersRight>
                            <CommentNum>{commentNum}則留言</CommentNum>
                            <ReadNum>{readNum}次閱讀</ReadNum>
                        </NumbersRight>
                    </Numbers>
                </Buttom>
            </PostLink>
            <Buttons>
                {like ? (
                    <Button
                        className="active"
                        onClick={likePost}
                        onMouseOver={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                    >
                        <LikedButtonIcon />讚
                    </Button>
                ) : (
                    <Button
                        onClick={likePost}
                        onMouseOver={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                    >
                        <Reactions isHover={isHover} active={false} />
                    </Button>
                )}
                {save ? (
                    <Button className="active" onClick={savePost}>
                        <BookmarkRoundedIcon color="primary" sx={{ fontSize: 22 }} />
                        收藏
                    </Button>
                ) : (
                    <Button onClick={savePost}>
                        <BookmarkBorderRoundedIcon sx={{ fontSize: 22 }} />
                        收藏
                    </Button>
                )}
                <CommentButton to={`/post/${post._id}`}>
                    <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 20 }} />
                    留言
                </CommentButton>
            </Buttons>
        </PostWrap>
    );
};
export default Post;
