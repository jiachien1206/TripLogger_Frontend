import PostList from './PostList';
import React from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';
import LeftSidebar from '../../components/LeftSidebar';
import RightSidebar from '../../components/RightSidebar';
import updateNewsfeeds from '../../utils/updateUserNewsfeeds.js';
import Paging from '../../components/Pagination';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 80px;
    gap: 50px;
    margin-left: 20vw;
`;
const PostsWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    min-width: 700px;
`;

const FilterWrap = styled.div``;

const FilterButton = styled.button`
    margin: 10px;
    padding: 5px;
    border: none;
    background: none;
    font-size: 18px;
    color: var(--secondary-font);
    cursor: pointer;
    &.active {
        font-size: 23px;
        font-weight: 800;
    }
`;

const Home = () => {
    const [filters, setFilters] = React.useState(['熱門文章', '最新文章']);
    const [activeFilter, setActiveFilter] = React.useState('熱門文章');
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
            setPage(1);
        }
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

                <PostList
                    setPostNum={setPostNum}
                    setPage={setPage}
                    page={page}
                    filter={activeFilter}
                />
                <Paging setPage={setPage} postNum={postNum} currentPage={page}></Paging>
            </PostsWrap>
            {/* <RightSidebar className="right-sidebar"></RightSidebar> */}
        </Wrapper>
    );
};

export default Home;
