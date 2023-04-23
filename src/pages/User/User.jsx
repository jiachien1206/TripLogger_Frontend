import React from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { useParams, Navigate, Link } from 'react-router-dom';
import Setting from './Setting';
import Map from './Map/Map';
import Posts from './MyPosts/Posts';
import Save from './MySave/SavedPosts';
import setting from '../../images/user_setting.png';
import map from '../../images/user_map.png';
import posts from '../../images/user_posts.png';
import save from '../../images/user_save.png';

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
    gap: 15px;
    height: 45px;
    border-radius: 5px;
    cursor: pointer;
    padding: 14px 0px 14px 10px;
    margin: 3px 0px;
    text-decoration: none;
    &:hover {
        background-color: #dbf5f0;
    }
    &.active {
        background-color: #ffffff;
    }
`;
const OptionIcon = styled.img`
    height: 21px;
`;
const OptionTitle = styled.div`
    font-size: 20px;
    color: #5c5c5c;
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
                                <OptionIcon src={setting} />
                                <OptionTitle>個人資料</OptionTitle>
                            </Option>
                        ) : (
                            <Option to={'/user/setting'}>
                                <OptionIcon src={setting} />
                                <OptionTitle>個人資料</OptionTitle>
                            </Option>
                        )}
                        {section === 'map' ? (
                            <Option className="active" to={'/user/map'}>
                                <OptionIcon src={map} />
                                <OptionTitle>旅遊足跡</OptionTitle>
                            </Option>
                        ) : (
                            <Option to={'/user/map'}>
                                <OptionIcon src={map} />
                                <OptionTitle>旅遊足跡</OptionTitle>
                            </Option>
                        )}
                        {section === 'posts' ? (
                            <Option className="active" to={'/user/posts'}>
                                <OptionIcon src={posts} />
                                <OptionTitle>我的文章</OptionTitle>
                            </Option>
                        ) : (
                            <Option to={'/user/posts'}>
                                <OptionIcon src={posts} />
                                <OptionTitle>我的文章</OptionTitle>
                            </Option>
                        )}
                        {section === 'save' ? (
                            <Option className="active" to={'/user/save'}>
                                <OptionIcon src={save} />
                                <OptionTitle>收藏清單</OptionTitle>
                            </Option>
                        ) : (
                            <Option to={'/user/save'}>
                                <OptionIcon src={save} />
                                <OptionTitle>收藏清單</OptionTitle>
                            </Option>
                        )}
                    </OptionsList>
                </Sidebar>
                <Section>
                    {section === 'setting' ? (
                        <Setting />
                    ) : section === 'map' ? (
                        <Map />
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
    else return <Navigate to="/" replace />;
};

export default User;
