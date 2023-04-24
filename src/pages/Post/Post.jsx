import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../utils/api.js';
import Comments from './Comment';
import { AuthContext } from '../../context/authContext';
const PostWrap = styled.div`
    // background-color: #fff;
    padding: 10px;
    margin: 10px auto;
    max-width: 600px;
`;

const PostMainImg = styled.img`
    width: 100%;
`;

const PostTitle = styled.div`
    font-size: 24px;
`;

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

const LikeButton = styled.button`
    border: 1px solid red;
    border-radius: 5px;
`;

const Post = () => {
    const { isLogin } = React.useContext(AuthContext);
    const [post, setPost] = React.useState();
    const [newComment, setNewComment] = React.useState(false);
    const postId = useParams().id;

    React.useEffect(() => {
        async function getPost(postId) {
            const res = await api.getPost(postId);
            const post = res.data.data;
            setPost(post);
            if (isLogin) {
                const user = JSON.parse(window.localStorage.getItem('user'));
                await api.addRead(postId, user.id, post.location.continent, post.type);
            } else {
                await api.addRead(postId, null, post.location.continent, post.type);
            }
        }
        getPost(postId);
    }, [postId]);
    React.useEffect(() => {
        async function getPost(postId) {
            const res = await api.getPost(postId);
            const post = res.data.data;
            setPost(post);
        }
        getPost(postId);
        setNewComment(false);
    }, [newComment]);
    if (!post) return null;
    return (
        <PostWrap>
            <PostMainImg src={post.main_image}></PostMainImg>
            <PostTitle>{post.title}</PostTitle>
            <PostContinent>{post.location.continent}</PostContinent>
            <PostCountry>{post.location.country}</PostCountry>
            <PostType>{post.type}</PostType>
            <PostAuthor>{post.authorId}</PostAuthor>
            <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
            <PostTime>{post.dates.post_date}</PostTime>
            <Comments
                location={post.location.continent}
                type={post.type}
                postId={postId}
                comments={post.comments}
                setNewComment={setNewComment}
            />

            {/* <LikeButton onClick={addLike}>{like}</LikeButton> */}
        </PostWrap>
    );
};
export default Post;
