import PostList from './PostList';
import React from 'react';
import styled from 'styled-components';
import LeftSidebar from '../../components/LeftSidebar';
import updateNewsfeeds from '../../utils/updateUserNewsfeeds.js';

const Wrapper = styled.div`
    display: flex;
`;
const PostsWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const FilterWrap = styled.div``;

const FilterButton = styled.button`
    margin: 10px;
    padding: 5px;
    border: none;
    background: none;
    font-size: 18px;
    color: #6f6f6f;
    cursor: pointer;
    &.active {
        font-size: 23px;
        font-weight: 800;
    }
`;

const Home = () => {
    const [filters, setFilters] = React.useState(['為你推薦', '熱門文章', '最新文章']);
    const [activeFilter, setActiveFilter] = React.useState('為你推薦');

    const handleActiveFilter = (filter) => {
        setActiveFilter(filter);
    };

    return (
        <Wrapper>
            <LeftSidebar />
            <PostsWrap>
                <FilterWrap>
                    {filters.map((filter) => {
                        return (
                            <FilterButton
                                className={activeFilter === filter && 'active'}
                                key={filter}
                                onClick={() => {
                                    handleActiveFilter(filter);
                                }}
                            >
                                {filter}
                            </FilterButton>
                        );
                    })}
                </FilterWrap>
                <PostList filter={activeFilter} />
            </PostsWrap>
        </Wrapper>
    );
};

export default Home;
