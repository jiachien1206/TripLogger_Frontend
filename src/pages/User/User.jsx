import React from 'react';
import styled from 'styled-components';
import Setting from './Setting';
import Map from './Map/Map';
import Posts from './MyPosts/Posts';
import Save from './MySave/SavedPosts';
import asia from '../../images/asia.png';
import north from '../../images/north-america.png';
import south from '../../images/south-america.png';
import europe from '../../images/europe.png';
import oceania from '../../images/oceania.png';
import africa from '../..//images/africa.png';
import antarctica from '../../images/antarctica.png';

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
const Option = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    height: 45px;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px 5px;
    &:hover {
        background-color: #e5e5e5;
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
    const [section, setSection] = React.useState('save');
    const handleSection = (section) => {
        setSection(section);
    };
    return (
        <Wrap>
            <Sidebar>
                <OptionsList>
                    <Option onClick={() => handleSection('setting')}>
                        <OptionIcon src={asia} />
                        <OptionTitle>個人資料</OptionTitle>
                    </Option>
                    <Option onClick={() => handleSection('map')}>
                        <OptionIcon src={europe} />
                        <OptionTitle>旅遊足跡</OptionTitle>
                    </Option>
                    <Option onClick={() => handleSection('posts')}>
                        <OptionIcon src={north} />
                        <OptionTitle>我的文章</OptionTitle>
                    </Option>
                    <Option onClick={() => handleSection('save')}>
                        <OptionIcon src={oceania} />
                        <OptionTitle>收藏清單</OptionTitle>
                    </Option>
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
};

export default User;
