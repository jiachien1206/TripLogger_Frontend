import PostList from './PostList';
import React from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';
import LeftSidebar from '../../components/LeftSidebar';
import RightSidebar from '../../components/RightSidebar';
import updateNewsfeeds from '../../utils/updateUserNewsfeeds.js';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 80px;
    gap: 50px;
`;
const PostsWrap = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 680px;
`;

const FilterWrap = styled.div``;

const FilterButton = styled.button`
    margin: 10px;
    padding: 5px;
    border: none;
    background: none;
    font-size: 18px;
    color: #65676b;
    cursor: pointer;
    &.active {
        font-size: 23px;
        font-weight: 800;
    }
`;

const Home = () => {
    const [filters, setFilters] = React.useState(['熱門文章', '最新文章']);
    const [activeFilter, setActiveFilter] = React.useState('熱門文章');
    const { isLogin } = React.useContext(AuthContext);
    const handleActiveFilter = (filter) => {
        setActiveFilter(filter);
    };
    React.useEffect(() => {
        if (isLogin) {
            setFilters(['為你推薦', '熱門文章', '最新文章']);
            setActiveFilter('為你推薦');
        }
    }, []);

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
            <RightSidebar className="right-sidebar"></RightSidebar>
        </Wrapper>
    );
};

export default Home;
