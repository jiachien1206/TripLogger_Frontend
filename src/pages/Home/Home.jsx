import PostList from './PostList';
import React from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';
import LeftSidebar from '../../components/LeftSidebar';
import Paging from '../../components/Pagination';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 80px;
    gap: 50px;
    margin-left: 18vw;
`;
const PostsWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 45vw;
    min-width: 700px;
`;

const FilterWrap = styled.div`
    display: flex;
    align-items: end;
`;

const FilterAndUnderline = styled.div`
    display: flex;
    flex-direction: column;
`;

const FilterButton = styled.button`
    margin: 10px 30px 5px 0px;
    padding: 0px;
    border: none;
    background: none;
    font-size: 18px;
    color: var(--secondary-font);
    cursor: pointer;
    transition: all 0.3s;
    &.active {
        font-size: 23px;
        font-weight: 800;
    }
    &:hover {
        font-weight: 600;
    }
`;

const UnderLine = styled.div`
    background-color: var(--primary-color);
    height: 5px;
    margin: 2px 30px 10px 0px;
    border-radius: 100px;
    visibility: hidden;
    &.active {
        visibility: visible;
    }
`;

const PostListPagingWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Home = () => {
    const [filters, setFilters] = React.useState(['熱門文章', '最新文章']);
    const [activeFilter, setActiveFilter] = React.useState('');
    const [page, setPage] = React.useState(1);
    const { isLogin } = React.useContext(AuthContext);
    const [postNum, setPostNum] = React.useState(0);
    const handleActiveFilter = (filter) => {
        setActiveFilter(filter);
    };
    React.useEffect(() => {
        if (isLogin) {
            setFilters(['為你推薦', '熱門文章', '最新文章']);
            setActiveFilter('為你推薦');
        } else {
            setActiveFilter('熱門文章');
        }
        setPage(1);
    }, []);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeFilter, page]);

    return (
        <Wrapper>
            <LeftSidebar />
            <PostsWrap>
                <FilterWrap>
                    {filters.map((filter) => {
                        if (activeFilter === filter) {
                            return (
                                <FilterAndUnderline key={filter}>
                                    <FilterButton
                                        className="active"
                                        key={filter}
                                        onClick={() => {
                                            handleActiveFilter(filter);
                                        }}
                                    >
                                        {filter}
                                    </FilterButton>
                                    <UnderLine className="active" />
                                </FilterAndUnderline>
                            );
                        } else {
                            return (
                                <FilterAndUnderline key={filter}>
                                    <FilterButton
                                        key={filter}
                                        onClick={() => {
                                            handleActiveFilter(filter);
                                        }}
                                    >
                                        {filter}
                                    </FilterButton>
                                    <UnderLine />
                                </FilterAndUnderline>
                            );
                        }
                    })}
                </FilterWrap>
                <PostListPagingWrap>
                    <PostList
                        setPostNum={setPostNum}
                        setPage={setPage}
                        page={page}
                        filter={activeFilter}
                    />
                    <Paging setPage={setPage} postNum={postNum} currentPage={page}></Paging>
                </PostListPagingWrap>
            </PostsWrap>
        </Wrapper>
    );
};

export default Home;
