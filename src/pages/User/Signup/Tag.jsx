import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api.js';

const Submit = styled.button``;

const Tag = ({ submit }) => {
    return (
        <>
            <Submit onClick={submit}>送出</Submit>
        </>
    );
};

export default Tag;
