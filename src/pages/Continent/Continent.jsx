import { useParams } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import LeftSidebar from '../../components/LeftSidebar';
import PostList from './PostList';
import RightSidebar from '../../components/RightSidebar';
import api from '../../utils/api.js';

const Banner = styled.div`
    position: relative;
    min-height: 350px;
    width: 100%;
    z-index: 1;
    background-size: cover;
    background-repeat: no-repeat;
    filter: brightness(90%);
    color: #ffffff;
`;

const BannerText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 60px;
    z-index: 20;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 50px;
`;

const FiltersWrap = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    height: 35px;
`;

const Filter = styled.div`
    font-size: 17px;
    padding: 5px 7px;
    border-radius: 8px;
    cursor: pointer;
    color: #050505;
    &:hover {
        background-color: #b8f4cf;
    }
    &.active {
        background-color: #b8f4cf;
    }
`;

const ContinentWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 650px;
    margin-top: 20px;
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
    const filters = ['交通', '住宿', '景點', '證件', '其他', '恐怖故事', '省錢妙招'];
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
    const [activeFilters, setActiveFilter] = React.useState([]);
    const [posts, setPosts] = React.useState([]);

    const handleFilter = (filter) => {
        if (activeFilters.includes(filter)) {
            const newActiveFilters = activeFilters.filter((f) => {
                return f !== filter;
            });
            setActiveFilter(newActiveFilters);
        } else {
            setActiveFilter([...activeFilters, filter]);
        }
    };
    const filterPosts = async (continent, filters) => {
        const res = await api.getContinentPosts(continent, filters.join(','));
        const posts = res.data.data;
        setPosts(posts);
    };

    React.useEffect(() => {
        filterPosts(continent, activeFilters);
    }, [continent, activeFilters]);
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
                    <FiltersWrap>
                        {filters.map((filter) => {
                            return (
                                <Filter
                                    key={filter}
                                    className={activeFilters.includes(filter) && 'active'}
                                    onClick={() => {
                                        handleFilter(filter);
                                    }}
                                >
                                    {filter}
                                </Filter>
                            );
                        })}
                    </FiltersWrap>
                    <PostList posts={posts}></PostList>
                </ContinentWrap>
                <RightSidebar />
            </Wrapper>
        </>
    );
};

export default Continent;
