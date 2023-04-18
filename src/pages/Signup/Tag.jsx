import React from 'react';
import styled from 'styled-components';
import { Title } from './Components.jsx';
import Options from './Options.jsx';

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
