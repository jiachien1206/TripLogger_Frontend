import React from 'react';
import styled from 'styled-components';
import api from '../../utils/api.js';
import { AuthContext } from '../../context/authContext';
import { TbMessageCircle2 } from 'react-icons/tb';
import { IoSend } from 'react-icons/io5';
import Avatar from '@mui/material/Avatar';
import { Alerts } from '../../utils/alerts.js';

const Wrap = styled.div`
    margin: 0px 30px;
`;

const TitleWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 30px 0px 20px;
`;

const TbMessageCircle2S = styled(TbMessageCircle2)`
    font-size: 30px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 600;
`;

const CommentArea = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const CommentBar = styled.div`
    display: flex;
    margin: 10px auto;
    width: 92%;
    gap: 10px;
    border-radius: 20px;
    resize: none;
    overflow: auto;
    border: none;
    background-color: #f0f4f5;
    padding: 10px 20px;
`;
const WriteComment = styled.input`
    background-color: transparent;
    border: none;
    width: 100%;
    font-size: 16px;
    &:focus-visible {
        outline: none !important;
    }
`;

const FakeWriteComment = styled.div`
    background-color: transparent;
    border: none;
    width: 100%;
    font-size: 16px;
`;
const IoSendS = styled(IoSend)`
    font-size: 25px;
    color: #c5c5c5;
    cursor: not-allowed;
    &.active {
        color: var(--primary-color);
        cursor: pointer;
    }
`;

const CommentWrap = styled.div`
    display: flex;
    gap: 15px;
    margin: 10px 0px;
`;

const Comment = styled.div`
    background-color: #f0f4f5;
    display: flex;
    border-radius: 20px;
    padding: 10px 20px;
    gap: 8px;
    flex-direction: column;
`;
const Commenter = styled.div`
    font-weight: bold;
`;

const CommentBottom = styled.div`
    display: flex;
    gap: 40px;
    justify-content: space-between;
    align-items: center;
`;
const CommentContent = styled.div``;
const CommentTime = styled.div`
    font-size: 12px;
    color: #949494;
`;

const Comments = ({
    postId,
    location,
    type,
    comments,
    setNewComment,
    setCommentNum,
    authorId,
    title,
}) => {
    const [comment, setComment] = React.useState('');
    const { jwtToken, isLogin, user, logout } = React.useContext(AuthContext);
    const handleKeyDown = (event) => {
        if (event.keyCode === 13 && comment != '') {
            submitComment();
        }
    };
    const submitComment = async () => {
        try {
            const content = {
                location,
                type,
                comment,
                commenter: user.name,
                authorId,
                title,
                commenterImg: user.image,
            };
            await api.writeComment(postId, content, jwtToken);
            setComment('');
            setCommentNum(function (prev) {
                return prev + 1;
            });
            setNewComment(true);
        } catch (e) {
            if (e.response.status === 401) {
                const result = await Alerts.unauthorized();
                if (result.isConfirmed) {
                    logout();
                }
            } else {
                Alerts.serverError();
            }
        }
    };
    return (
        <Wrap>
            <TitleWrap>
                <TbMessageCircle2S />
                <Title>留言板</Title>
            </TitleWrap>
            <CommentArea>
                <Avatar src={user.image} sx={{ width: 43, height: 43 }}></Avatar>
                {isLogin ? (
                    <CommentBar>
                        <WriteComment
                            onKeyDown={handleKeyDown}
                            style={{ height: 'auto' }}
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            placeholder="留言......"
                        ></WriteComment>
                        {comment === '' ? (
                            <IoSendS />
                        ) : (
                            <IoSendS className="active" onClick={submitComment} />
                        )}
                    </CommentBar>
                ) : (
                    <CommentBar>
                        <FakeWriteComment>登入就可以留言囉～</FakeWriteComment>
                        <IoSendS />
                    </CommentBar>
                )}
            </CommentArea>
            {comments.map((comment) => {
                const utcDate = new Date(comment.timestamp);
                const dateTime = utcDate.toLocaleString();
                const [date] = dateTime.split(' ');
                return (
                    <CommentWrap key={comment._id}>
                        <Avatar src={comment.userId.image} sx={{ width: 43, height: 43 }}></Avatar>

                        <Comment>
                            <CommentBottom>
                                <Commenter>{comment.userId.name}</Commenter>
                                <CommentTime>{date}</CommentTime>
                            </CommentBottom>
                            <CommentContent> {comment.content}</CommentContent>
                        </Comment>
                    </CommentWrap>
                );
            })}
        </Wrap>
    );
};

export default Comments;
