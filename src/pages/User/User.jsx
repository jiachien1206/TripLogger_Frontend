import React from 'react';
import styled from 'styled-components';
import Setting from './Setting';
import Map from './Map/Map';
import Posts from './MyPosts/Posts';
import asia from '../../images/asia.png';
import north from '../../images/north-america.png';
import south from '../../images/south-america.png';
import europe from '../../images/europe.png';
import oceania from '../../images/oceania.png';
import africa from '../..//images/africa.png';
import antarctica from '../../images/antarctica.png';

const Wrap = styled.div`
    margin-top: 100px;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    gap: 60px;
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
    width: 180px;
`;

const OptionsList = styled.div``;
const Option = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 34px;
    border-radius: 5px;
    cursor: pointer;
    padding-left: 5px;
    &:hover {
        background-color: #e5e5e5;
    }
`;
const OptionIcon = styled.img`
    height: 21px;
`;
const OptionTitle = styled.div`
    font-size: 16px;
    color: #6f6f6f;
`;

const Section = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    gap: 30px;
    align-items: center;
    color: #5c5c5c;
`;

const User = () => {
    const [section, setSection] = React.useState('posts');
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
                    <Option onClick={() => handleSection('setting')}>
                        <OptionIcon src={oceania} />
                        <OptionTitle>大洋洲</OptionTitle>
                    </Option>
                    <Option onClick={() => handleSection('setting')}>
                        <OptionIcon src={south} />
                        <OptionTitle>南美洲</OptionTitle>
                    </Option>
                    <Option onClick={() => handleSection('setting')}>
                        <OptionIcon src={africa} />
                        <OptionTitle>非洲</OptionTitle>
                    </Option>
                    <Option onClick={() => handleSection('setting')}>
                        <OptionIcon src={antarctica} />
                        <OptionTitle>南極洲</OptionTitle>
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
                ) : (
                    <></>
                )}
            </Section>
        </Wrap>
    );
};

export default User;
