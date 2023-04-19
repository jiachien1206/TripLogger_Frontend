import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../../../utils/api.js';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #efefef;
    background-color: #ffffff;
    height: 90px;
    width: 100%;
    padding: 10px 30px;
    &:hover {
        background-color: #efefef;
    }
    gap: 40px;
`;

const PostTitle = styled(Link)`
    font-size: 18px;
    cursor: pointer;
    color: #236262;
    text-decoration: none;
    font-weight: 500;
`;

const Buttons = styled.div`
    display: flex;
    gap: 30px;
`;

const EditLink = styled(Link)`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    transition: background-color 0.2s;
    &:hover {
        background-color: #c5decd;
    }
`;

const Delete = styled.div`
width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    cursor:pointer;
    transition: background-color 0.2s;
    &:hover {
        background-color: #EEC0B0;
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
                    <PostTitle to={`/post/${post._id}`}>{post.title}</PostTitle>
                    <Buttons>
                        <EditLink to={`/edit/${post._id}`}>
                            <CreateRoundedIcon color="secondary" />
                        </EditLink>
                        <Delete onClick={deletePost}>
                            <DeleteRoundedIcon color="secondary" />
                        </Delete>
                    </Buttons>
                </Wrapper>
            ) : (
                <></>
            )}
        </>
    );
};

export default Post;
