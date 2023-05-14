import { useParams } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import LeftSidebar from '../../components/LeftSidebar';
import PostList from './PostList';
import api from '../../utils/api.js';
import Paging from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { Alerts } from '../../utils/alerts.js';

const Banner = styled.div`
    margin-top: 60px;
    position: relative;
    aspect-ratio: 36/9;
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
    justify-content: start;
    margin-top: 20px;
    gap: 100px;
`;

const FiltersWrap = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    margin-bottom: 14px;
`;

const Filter = styled.div`
    font-size: 17px;
    padding: 5px 7px 5px 9px;
    border-radius: 8px;
    cursor: pointer;
    color: var(--secondary-font);
    font-weight: 500;
    &:hover {
        background-color: var(--light-orange);
        color: var(--white);
    }
    &.active {
        color: var(--white);
        background-color: var(--secondary-color);
    }
`;

const ContinentWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 45%;
    margin-top: 20px;
    align-items: center;
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
    const filters = ['交通', '住宿', '景點', '證件', '恐怖故事', '省錢妙招', '其他'];
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
        navigate('/');
    }
    const [activeFilter, setActiveFilter] = React.useState(filters);
    const [posts, setPosts] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [postNum, setPostNum] = React.useState(0);
    const navigate = useNavigate();
    const handleFilter = (filter) => {
        if (activeFilter.includes(filter)) {
            const newActiveFilters = activeFilter.filter((f) => {
                return f !== filter;
            });
            setActiveFilter(newActiveFilters);
        } else {
            setActiveFilter([...activeFilter, filter]);
        }
    };
    const filterPosts = async (continent, filters) => {
        try {
            const res = await api.getContinentPosts(continent, filters.join(','), page);
            const { posts, postsNum } = res.data.data;
            setPosts(posts);
            setPostNum(Math.ceil(postsNum / 10));
        } catch (e) {
            Alerts.serverError();
        }
    };
    const scollToRef = React.useRef();

    React.useEffect(() => {
        filterPosts(continent, activeFilter);
    }, [page, continent, activeFilter]);
    React.useEffect(() => {
        if (page !== 1) setPage(1);
    }, [continent, activeFilter]);

    React.useEffect(() => {
        scollToRef.current.scrollIntoView();
    }, [page]);

    return (
        <>
            <div ref={scollToRef}></div>
            <Banner
                style={{
                    backgroundImage: `url(https://triplogger.s3.ap-northeast-1.amazonaws.com/banner/${continent}.jpg)`,
                }}
            >
                <BannerText>{map[continent]}</BannerText>
            </Banner>

            <Wrapper>
                <LeftSidebar active={continent} className={'continent'} />
                <ContinentWrap>
                    <FiltersWrap>
                        {filters.map((filter) => {
                            return (
                                <Filter
                                    key={filter}
                                    className={activeFilter.includes(filter) && 'active'}
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
                    <Paging setPage={setPage} postNum={postNum} currentPage={page}></Paging>
                </ContinentWrap>
            </Wrapper>
        </>
    );
};

export default Continent;
