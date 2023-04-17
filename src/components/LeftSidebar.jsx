import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import mapImg from '../images/map.png';
import asia from '../images/asia.png';
import north from '../images/north-america.png';
import south from '../images/south-america.png';
import europe from '../images/europe.png';
import oceania from '../images/oceania.png';
import africa from '../images/africa.png';
import antarctica from '../images/antarctica.png';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 40px 20px 0px;
    gap: 30px;
`;
const MapLink = styled(Link)``;
const Map = styled.img`
    width: 250px;
    margin: 0px auto;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
`;

const ContinentList = styled.div``;
const Continent = styled(Link)`
    text-decoration: none;
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
const ContinentIcon = styled.img`
    height: 21px;
`;
const ContinentsTitle = styled.div`
    font-size: 16px;
    color: #6f6f6f;
`;

const Sidebar = () => {
    return (
        <Wrapper>
            <MapLink to="/map">
                <Map src={mapImg} />
            </MapLink>
            <ContinentList>
                <Continent to="/asia">
                    <ContinentIcon src={asia} />
                    <ContinentsTitle>亞洲</ContinentsTitle>
                </Continent>
                <Continent to="/europe">
                    <ContinentIcon src={europe} />
                    <ContinentsTitle>歐洲</ContinentsTitle>
                </Continent>
                <Continent to="/north-america">
                    <ContinentIcon src={north} />
                    <ContinentsTitle>北美洲</ContinentsTitle>
                </Continent>
                <Continent to="/oceania">
                    <ContinentIcon src={oceania} />
                    <ContinentsTitle>大洋洲</ContinentsTitle>
                </Continent>
                <Continent to="/south-america">
                    <ContinentIcon src={south} />
                    <ContinentsTitle>南美洲</ContinentsTitle>
                </Continent>
                <Continent to="/africa">
                    <ContinentIcon src={africa} />
                    <ContinentsTitle>非洲</ContinentsTitle>
                </Continent>
                <Continent to="/antarctica">
                    <ContinentIcon src={antarctica} />
                    <ContinentsTitle>南極洲</ContinentsTitle>
                </Continent>
            </ContinentList>
        </Wrapper>
    );
};

export default Sidebar;
