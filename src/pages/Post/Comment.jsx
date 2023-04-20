import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../utils/api.js';
import send from '../../images/send.svg';

const Wrap = styled.div`
    margin: 30px 0px;
    border: 2px solid #000000;
    padding: 10px;
`;
const CommentBar = styled.div`
    display: flex;
    margin: 10px auto;
    width: 500px;
    gap: 10px;
`;
const WriteComment = styled.textarea`
    height: 60px;
    width: 320px;
    resize: none;
    overflow: auto;
`;

const SubmitComment = styled.div`
    width: 25px;
    height: 25px;
    background-image: url(${send});
    background-repeat: no-repeat;
    border-radius: 3px;
    &:hover {
        background-color: #b8f4cf;
    }
`;

const PostComment = styled.div``;

const Comments = ({ postId, location, type, comments, setNewComment }) => {
    const [comment, setComment] = React.useState('');
    const submitComment = async () => {
        const jwtToken = window.localStorage.getItem('jwtToken');
        const content = {
            location,
            type,
            comment,
        };
        const res = await api.writeComment(postId, content, jwtToken);
        setNewComment(true);
    };

    return (
        <Wrap>
            {comments.map((comment) => {
                return (
                    <PostComment
                        key={comment._id}
                    >{`${comment.userId}: ${comment.content}`}</PostComment>
                );
            })}
            <CommentBar>
                <WriteComment
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                ></WriteComment>
                <SubmitComment onClick={submitComment} />
            </CommentBar>
        </Wrap>
    );
};

export default Comments;
