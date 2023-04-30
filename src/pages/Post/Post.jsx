import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../utils/api.js';
import Comments from './Comment';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { TbMessageCircle2 } from 'react-icons/tb';
import { IoNewspaperOutline } from 'react-icons/io5';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import Reactions from '../../components/Reaction.jsx';

const Wrap = styled.div`
    display: flex;
    position: absolute;
    left: 15%;
    margin-top: 50px;
    gap: 50px;
`;

const ButtonsWrap = styled.div`
    position: fixed;
    flex-direction: column;
    top: 120px;
    left: 7%;
    display: flex;
    align-items: center;
    gap: 25px;
    z-index: 1;
`;

const Button = styled.div`
    cursor: pointer;
    display: flex;
    width: 40px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
`;

const Number = styled.div`
    letter-spacing: 0;
`;

const AiOutlineHeartS = styled(AiOutlineHeart)`
    font-size: 32px;
`;

const AiFillHeartS = styled(AiFillHeart)`
    font-size: 32px;
    color: #f52047;
`;

const FaRegBookmarkS = styled(FaRegBookmark)`
    font-size: 26px;
    transition: all 0.3s;
    &:hover {
        color: #0044a2;
        font-size: 31px;
    }
`;

const FaBookmarkS = styled(FaBookmark)`
    font-size: 26px;
    color: #0044a2;
`;

const TbMessageCircle2S = styled(TbMessageCircle2)`
    font-size: 30px;
    transition: all 0.3s;
    &:hover {
        color: #008289;
        font-size: 36px;
    }
`;
const PostWrap = styled.div`
    border-radius: 15px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    width: 800px;
    cursor: default;
    z-index: 0;
    padding-bottom: 40px;
    margin-bottom: 40px;
`;

const PostMainImg = styled.img`
    position: relative;
    height: 500px;
    width: 800px;
    object-fit: cover;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
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

const Location = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    color: #65676b;
    font-size: 15px;
    margin-right: 30px;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

const AuthorName = styled.div`
    font-size: 17px;
    font-weight: 500;
`;

const Lower = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px;
`;

const PostTitle = styled.h2`
    margin-bottom: 10px;
    font-size: 30px;
`;

const PostType = styled.div``;

const PostContent = styled.div`
    font-size: 17px;

    & img {
        max-width: 100%;
    }
`;

const PostTime = styled.div`
    font-size: 14px;
`;

const Divider = styled.div`
    margin: 0px auto;
    height: 2px;
    width: 95%;
    background-color: #dbdbdb;
    border-radius: 100px;
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 100px;
    right: 5%;
`;

const ModalTitle = styled.div`
    font-size: 20px;
`;
const SignButtonWrap = styled.div`
    display: flex;
    gap: 15px;
`;
const SignButton = styled(Link)`
    font-size: 17px;
    text-decoration: none;
    padding: 5px 15px;
    border-radius: 6px;
    transition: border-radius 0.4s;
    &.signup {
        background-color: #236262;
        color: #ffffff;
        font-size: 18px;
        padding-top: 6px;
    }
    &.signin {
        border: 2px solid #236262;
        color: #236262;
    }
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    bgcolor: '#ffffff',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    alignItems: 'center',
    color: '#050505',
};

const RightSidebar = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    width: 300px;
    padding: 20px 25px;
    gap: 15px;
`;

const RightAuthor = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
`;
const RightAuthorName = styled.div`
    font-size: 20px;
    font-weight: bold;
`;
const NewPostsTitle = styled.div`
    display: flex;
    gap: 10px;
    font-size: 20px;
    font-weight: 500;
`;
const NewPost = styled(Link)`
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    color: #4a4a4a;
    &:hover {
        background-color: #f0f4f5;
        border-radius: 5px;
    }
`;
const NewPostImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 5px;
    object-fit: cover;
`;
const NewPostTitle = styled.div``;

const Post = () => {
    const { isLogin, user, jwtToken } = React.useContext(AuthContext);
    const [post, setPost] = React.useState();
    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = React.useState(false);
    const [date, setDate] = React.useState();
    const [like, setLike] = React.useState(false);
    const [save, setSave] = React.useState(false);
    const [isHover, setIsHover] = React.useState(false);
    const [likeNum, setLikeNum] = React.useState(0);
    const [saveNum, setSaveNum] = React.useState(0);
    const [readNum, setReadNum] = React.useState(0);
    const [commentNum, setCommentNum] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [authorPosts, setAuthorPosts] = React.useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const postId = useParams().id;
    const scollToRef = React.useRef();

    function likePost() {
        const jwtToken = window.localStorage.getItem('jwtToken');
        let localStorageLikedPosts = window.localStorage.getItem('likedPosts');
        localStorageLikedPosts = JSON.parse(localStorageLikedPosts);
        if (!like) {
            setLikeNum(function (prev) {
                return prev + 1;
            });
            const data = {
                location: post.location.continent,
                type: post.type,
                like: true,
                authorId: post.authorId,
                title: post.title,
                liker: user.name,
            };
            api.likePost(post._id, data, jwtToken);
            localStorageLikedPosts.push(post._id);
            window.localStorage.setItem('likedPosts', JSON.stringify(localStorageLikedPosts));
        } else {
            setLikeNum(function (prev) {
                return prev - 1;
            });
            const data = {
                location: post.location.continent,
                type: post.type,
                like: false,
                authorId: post.authorId,
                title: post.title,
                liker: user.name,
            };
            api.likePost(post._id, data, jwtToken);
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
            setSaveNum(function (prev) {
                return prev + 1;
            });
            api.savePost(post._id, post.location.continent, post.type, true, jwtToken);
            localStorageSavedPosts.push(post._id);
            window.localStorage.setItem('savedPosts', JSON.stringify(localStorageSavedPosts));
        } else {
            setSaveNum(function (prev) {
                return prev - 1;
            });
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

    React.useEffect(() => {
        const matchPostStatus = async () => {
            const res = await api.getPostNumbers(postId);
            const { read_num, like_num, save_num, comment_num } = res.data.data;

            setReadNum(read_num);
            setLikeNum(like_num);
            setSaveNum(save_num);
            setCommentNum(comment_num);
            const likedPosts = window.localStorage.getItem('likedPosts');
            if (likedPosts.includes(postId)) {
                setLike(true);
            }
            const savedPosts = window.localStorage.getItem('savedPosts');
            if (savedPosts.includes(postId)) {
                setSave(true);
            }
        };
        async function getPost(postId) {
            const res = await api.getPost(postId);
            const post = res.data.data;
            setPost(post);
            const sortedComments = post.comments.sort(function (a, b) {
                return new Date(b.timestamp) - new Date(a.timestamp);
            });
            setComments(sortedComments);
            if (isLogin) {
                const user = JSON.parse(window.localStorage.getItem('user'));
                await api.addRead(postId, user.id, post.location.continent, post.type);
                await matchPostStatus();
            } else {
                await api.addRead(postId, null, post.location.continent, post.type);
            }
            const utcDate = new Date(post.dates.post_date);
            const dateTime = utcDate.toLocaleString();
            const [date] = dateTime.split(' ');
            setDate(date);
            const response = await api.getUserPosts(post.authorId._id);
            setAuthorPosts(response.data.data.slice(0, 6));
            setNewComment(false);
        }

        getPost(postId);
    }, [newComment, postId]);

    if (!post) return null;

    return (
        <Wrap>
            <ButtonsWrap>
                {isLogin ? (
                    <>
                        {like ? (
                            <Button>
                                <AiFillHeartS className="active" onClick={likePost} />
                                <Number>{likeNum}</Number>
                            </Button>
                        ) : (
                            <Button
                                onClick={likePost}
                                onMouseOver={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                            >
                                <Reactions isHover={isHover} active={false} page={'post'} />
                                <Number>{likeNum}</Number>
                            </Button>
                        )}
                        {save ? (
                            <Button className="active" onClick={savePost}>
                                <FaBookmarkS />
                                <Number>{saveNum}</Number>
                            </Button>
                        ) : (
                            <Button onClick={savePost}>
                                <FaRegBookmarkS />
                                <Number>{saveNum}</Number>
                            </Button>
                        )}
                        <Button
                            onClick={() =>
                                scollToRef.current.scrollIntoView({
                                    behavior: 'smooth',
                                    inline: 'nearest',
                                })
                            }
                        >
                            <TbMessageCircle2S />
                            <Number>{commentNum}</Number>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={handleOpen}>
                            <AiOutlineHeartS />
                            <Number>{saveNum}</Number>
                        </Button>
                        <Button onClick={handleOpen}>
                            <FaRegBookmarkS />
                            <Number>{saveNum}</Number>
                        </Button>
                        <Button onClick={handleOpen}>
                            <TbMessageCircle2S />
                            <Number>{commentNum}</Number>
                        </Button>

                        <Modal
                            aria-labelledby="spring-modal-title"
                            aria-describedby="spring-modal-description"
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                                backdrop: {
                                    TransitionComponent: Fade,
                                },
                            }}
                        >
                            <Fade in={open}>
                                <Box sx={style}>
                                    <ModalTitle>登入TripLogger以使用更多功能</ModalTitle>
                                    <SignButtonWrap>
                                        <SignButton className="signup" to="/signup">
                                            註冊
                                        </SignButton>
                                        <SignButton className="signin" to="/signin">
                                            登入
                                        </SignButton>
                                    </SignButtonWrap>
                                </Box>
                            </Fade>
                        </Modal>
                    </>
                )}
            </ButtonsWrap>
            <PostWrap>
                <PostMainImg src={post.main_image}></PostMainImg>
                <Buttom>
                    <Upper>
                        <Author>
                            <Avatar
                                src={post.authorId.image}
                                sx={{ width: 50, height: 50 }}
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
                    <Lower>
                        <PostTitle>{post.title}</PostTitle>
                        <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
                        <div ref={scollToRef}></div>
                    </Lower>
                    <Divider />
                </Buttom>

                <Comments
                    location={post.location.continent}
                    type={post.type}
                    postId={postId}
                    comments={comments}
                    setNewComment={setNewComment}
                    authorId={post.authorId}
                    title={post.title}
                />
            </PostWrap>

            <Right>
                <RightSidebar className="right-sidebar">
                    <RightAuthor>
                        <Avatar src={post.authorId.image} sx={{ width: 60, height: 60 }} />
                        <RightAuthorName>{post.authorId.name}</RightAuthorName>
                    </RightAuthor>
                    <NewPostsTitle>
                        <IoNewspaperOutline style={{ fontSize: '26px' }} /> 最新文章
                    </NewPostsTitle>
                    {authorPosts.map((p) => {
                        return (
                            <NewPost key={p._id} to={`/post/${p._id}`}>
                                <NewPostImg src={p.main_image} />
                                <NewPostTitle>{p.title}</NewPostTitle>
                            </NewPost>
                        );
                    })}
                </RightSidebar>
            </Right>
        </Wrap>
    );
};
export default Post;
