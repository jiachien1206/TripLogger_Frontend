import PostList from './PostList';
import React from 'react';
import styled from 'styled-components';
import LeftSidebar from '../../components/LeftSidebar';
import updateNewsfeeds from '../../utils/updateUserNewsfeeds.js';

const Wrapper = styled.div`
    max-width: 1440px;
    display: flex;
`;
const PostsWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
`;

const FilterWrap = styled.div`
    margin: 10px auto;
`;

const FilterButton = styled.button`
    width: 100px;
    margin: 10px;
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
