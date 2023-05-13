import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../../../utils/api.js';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Alerts } from '../../../utils/alerts.js';
import { AuthContext } from '../../../context/authContext';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #efefef;
    background-color: #ffffff;
    height: 90px;
    width: 100%;
    padding: 10px 30px;
    &:hover {
        background-color: #efefef;
    }
    gap: 40px;
    &:first-child {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
    &:last-child {
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-bottom: none;
    }
`;

const PostTitle = styled(Link)`
    font-size: 18px;
    cursor: pointer;
    color: var(--dark-green);
    text-decoration: none;
    font-weight: 500;
    word-break: break-word;
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
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
        background-color: #eec0b0;
    }
`;

const Post = ({ post }) => {
    const { jwtToken, logout } = React.useContext(AuthContext);
    const [show, setShow] = React.useState(true);
    const deletePost = async () => {
        Alerts.deletePost()
            .then((result) => {
                if (result.isConfirmed) {
                    api.deletePost(post._id, jwtToken);
                    setShow(false);
                }
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    Alerts.unauthorized().then((result) => {
                        if (result.isConfirmed) {
                            logout();
                        }
                    });
                } else {
                    Alerts.serverError();
                }
            });
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
