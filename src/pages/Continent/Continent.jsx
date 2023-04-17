import { useParams } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import LeftSidebar from '../../components/LeftSidebar';
import PostList from './PostList';

const Wrapper = styled.div`
    display: flex;
`;

const Continent = () => {
    const continents = [
        'asia',
        'europe',
        'north-america',
        'oceania',
        'south-america',
        'africa',
        'antarctica',
    ];
    const continent = useParams().continent;
    if (!continents.includes(continent)) {
        window.location.replace('/');
    }

    return (
        <Wrapper>
            <LeftSidebar />
            <PostList continent={continent}></PostList>
        </Wrapper>
    );
};

export default Continent;
