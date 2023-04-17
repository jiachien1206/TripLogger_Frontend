import { useParams } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import LeftSidebar from '../../components/LeftSidebar';
import PostList from './PostList';

const Wrapper = styled.div`
    display: flex;
    margin-top: 20px;
`;

const ContinentWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 650px;
`;
const Banner = styled.div`
    position: relative;
    height: 300px;
    width: 100%;
    // border-radius: 8px;
    z-index: 1;
    overflow: hidden;
    background-size: contain;
    background-repeat: no-repeat;
    filter: brightness(70%);
    &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(https://triplogger.s3.ap-northeast-1.amazonaws.com/banner/${(props) =>
            props.continent}.jpg);
        background-position: center;
        filter: brightness(70%);
    }
`;

const BannerText = styled.div`
    position: absolute;
    top: 80%;
    right: 5%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 60px;
    z-index: 20;
`;

const Continent = () => {
    // const [continentStatus, setContinentStatus] = React.useState();
    const continents = [
        'asia',
        'europe',
        'north-america',
        'oceania',
        'south-america',
        'africa',
        'antarctica',
    ];
    const map = {
        asia: '亞洲',
        europe: '歐洲',
        'north-america': '北美洲',
        oceania: '大洋洲',
        'south-america': '南美洲',
        africa: '非洲',
        antarctica: '南極洲',
    };
    const continent = useParams().continent;
    if (!continents.includes(continent)) {
        window.location.replace('/');
    }

    return (
        <>
            <Banner
                style={{
                    backgroundImage: `url(https://triplogger.s3.ap-northeast-1.amazonaws.com/banner/${continent}.jpg)`,
                }}
            >
                <BannerText>{map[continent]}</BannerText>
            </Banner>

            <Wrapper>
                <LeftSidebar />
                <ContinentWrap>
                    <PostList continent={continent}></PostList>
                </ContinentWrap>
            </Wrapper>
        </>
    );
};

export default Continent;
