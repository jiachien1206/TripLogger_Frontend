import React from 'react';
import styled from 'styled-components';
import Block from './Block';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0px 20px 0px;
    gap: 30px;
`;
const ProfileImage = styled.div``;
const RightSidebar = () => {
    return (
        <Wrapper>
            <Block></Block>
        </Wrapper>
    );
};

export default RightSidebar;
