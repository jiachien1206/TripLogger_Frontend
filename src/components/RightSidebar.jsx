import React from 'react';
import styled from 'styled-components';
import Block from './Block';

const Wrapper = styled.div`
    position: fixed;
    top: 80px;
    right: 5%;
    display: flex;
    flex-direction: column;
    margin: 20px 0px 20px 0px;
    gap: 30px;
    &.continent {
        position: static;
    }
`;
const ProfileImage = styled.div``;
const RightSidebar = ({ className }) => {
    return (
        <Wrapper className={className}>
            <Block></Block>
        </Wrapper>
    );
};

export default RightSidebar;
