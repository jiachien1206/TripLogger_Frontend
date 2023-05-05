import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { useParams, Navigate, Link } from 'react-router-dom';
import Setting from './Setting';
import Posts from './MyPosts/Posts';
import Save from './MySave/SavedPosts';
import { BsPersonFill } from 'react-icons/bs';
import { RiProfileLine } from 'react-icons/ri';
import { MdMap } from 'react-icons/md';
import { BiBookBookmark } from 'react-icons/bi';
const Map = lazy(() => import('./Map/Map'));
const Wrap = styled.div`
    margin: 100px auto 0px;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    gap: 80px;
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
    width: 180px;
`;

const OptionsList = styled.div`
    display: flex;
    flex-direction: column;
    width: 220px;
`;
const Option = styled(Link)`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 45px;
    border-radius: 5px;
    cursor: pointer;
    padding: 14px 0px 14px 10px;
    margin: 3px 0px;
    text-decoration: none;
    color: var(--secondary-font);
    &:hover {
        background-color: var(--light-orange);
    }
    &.active {
        background-color: var(--secondary-color);
        color: var(--white);
    }
`;
const OptionIcon = styled.img`
    height: 21px;
`;
const OptionTitle = styled.div`
    font-size: 20px;
    font-weight: 500;
`;

const Section = styled.div`
    width: 650px;
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    // gap: 10px;
    // align-items: center;
    color: #5c5c5c;
`;

const User = () => {
    const section = useParams().section;
    const { isLogin } = React.useContext(AuthContext);

    if (isLogin)
        return (
            <Wrap>
                <Sidebar>
                    <OptionsList>
                        {section === 'setting' ? (
                            <Option className="active" to={'/user/setting'}>
                                <BsPersonFill style={{ fontSize: '26px' }} />
                                <OptionTitle>個人資料</OptionTitle>
                            </Option>
                        ) : (
                            <Option to={'/user/setting'}>
                                <BsPersonFill style={{ fontSize: '26px' }} />
                                <OptionTitle>個人資料</OptionTitle>
                            </Option>
                        )}
                        {section === 'map' ? (
                            <Option className="active" to={'/user/map'}>
                                <MdMap style={{ fontSize: '26px' }} />
                                <OptionTitle>旅遊足跡</OptionTitle>
                            </Option>
                        ) : (
                            <Option to={'/user/map'}>
                                <MdMap style={{ fontSize: '26px' }} />
                                <OptionTitle>旅遊足跡</OptionTitle>
                            </Option>
                        )}
                        {section === 'posts' ? (
                            <Option className="active" to={'/user/posts'}>
                                <RiProfileLine style={{ fontSize: '26px' }} />
                                <OptionTitle>我的文章</OptionTitle>
                            </Option>
                        ) : (
                            <Option to={'/user/posts'}>
                                <RiProfileLine style={{ fontSize: '26px' }} />
                                <OptionTitle>我的文章</OptionTitle>
                            </Option>
                        )}
                        {section === 'save' ? (
                            <Option className="active" to={'/user/save'}>
                                <BiBookBookmark style={{ fontSize: '25px' }} />
                                <OptionTitle>收藏清單</OptionTitle>
                            </Option>
                        ) : (
                            <Option to={'/user/save'}>
                                <BiBookBookmark style={{ fontSize: '25px' }} />
                                <OptionTitle>收藏清單</OptionTitle>
                            </Option>
                        )}
                    </OptionsList>
                </Sidebar>
                <Section>
                    {section === 'setting' ? (
                        <Setting />
                    ) : section === 'map' ? (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Map />
                        </Suspense>
                    ) : section === 'posts' ? (
                        <Posts></Posts>
                    ) : section === 'save' ? (
                        <Save></Save>
                    ) : (
                        <></>
                    )}
                </Section>
            </Wrap>
        );
    else return <Navigate to="/" replace={false} />;
};

export default User;
