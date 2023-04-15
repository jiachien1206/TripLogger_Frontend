import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../../../utils/api.js';
import editBtn from '../../../images/edit.svg';
import deleteBtn from '../../../images/delete.svg';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border: 1px solid grey;
    border-radius: 5px;
    margin: 10px 30px;
`;

const PostTitle = styled.div``;

const EditLink = styled(Link)``;

const EditIcon = styled.div`
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-image: url(${editBtn});
`;

const DeleteIcon = styled.div`
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-image: url(${deleteBtn});
    cursor: pointer;
`;

const Post = ({ post, jwtToken }) => {
    const [show, setShow] = React.useState(true);
    const deletePost = () => {
        if (window.confirm('確定刪除文章?')) {
            api.deletePost(post._id, jwtToken);
            setShow(false);
        }
    };
    return (
        <>
            {show ? (
                <Wrapper>
                    <PostTitle>{post.title}</PostTitle>
                    <EditLink to={`/edit/${post._id}`}>
                        <EditIcon />
                    </EditLink>
                    <DeleteIcon onClick={deletePost} />
                </Wrapper>
            ) : (
                <></>
            )}
        </>
    );
};

export default Post;
