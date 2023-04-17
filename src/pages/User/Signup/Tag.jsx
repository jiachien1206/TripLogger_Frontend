import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api.js';
import { Title } from './Components';
import Options from './Options';

const Submit = styled.button``;

const Tag = ({ tags, setTags, submit }) => {
    return (
        <>
            <Title>喜歡的文章類別</Title>
            <Options options={tags} setOrder={setTags}></Options>
            <Submit onClick={submit}>送出</Submit>
        </>
    );
};

export default Tag;
