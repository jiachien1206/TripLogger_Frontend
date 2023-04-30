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
    position: fixed;
    top: 80px;
    left: 5%;
    display: flex;
    flex-direction: column;
    margin: 20px 0px 20px 0px;
    gap: 30px;
    &.continent {
        position: static;
    }
`;
const MapLink = styled(Link)``;
const Map = styled.img`
    width: 260px;
    margin: 0px auto;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
`;

const ContinentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;
const Continent = styled(Link)`
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 5px;
    cursor: pointer;
    padding: 9px 0px 9px 12px;
    font-weight: 500;
    &:hover {
        background-color: #dbf5f0;
    }
    &.active {
        background-color: #ffffff;
    }
`;
const ContinentIcon = styled.img`
    height: 22px;
`;
const ContinentsTitle = styled.div`
    font-size: 19px;
    color: #65676b;
`;

const Sidebar = ({ active, className }) => {
    return (
        <Wrapper className={className}>
            <MapLink to="/map">
                <Map src={mapImg} />
            </MapLink>
            <ContinentList>
                {active === 'asia' ? (
                    <Continent className="active" to="/location/asia">
                        <ContinentIcon src={asia} />
                        <ContinentsTitle>亞洲</ContinentsTitle>
                    </Continent>
                ) : (
                    <Continent to="/location/asia">
                        <ContinentIcon src={asia} />
                        <ContinentsTitle>亞洲</ContinentsTitle>
                    </Continent>
                )}
                {active === 'europe' ? (
                    <Continent className="active" to="/location/europe">
                        <ContinentIcon src={europe} />
                        <ContinentsTitle>歐洲</ContinentsTitle>
                    </Continent>
                ) : (
                    <Continent to="/location/europe">
                        <ContinentIcon src={europe} />
                        <ContinentsTitle>歐洲</ContinentsTitle>
                    </Continent>
                )}
                {active === 'north-america' ? (
                    <Continent className="active" to="/location/north-america">
                        <ContinentIcon src={north} />
                        <ContinentsTitle>北美洲</ContinentsTitle>
                    </Continent>
                ) : (
                    <Continent to="/location/north-america">
                        <ContinentIcon src={north} />
                        <ContinentsTitle>北美洲</ContinentsTitle>
                    </Continent>
                )}
                {active === 'oceania' ? (
                    <Continent className="active" to="/location/oceania">
                        <ContinentIcon src={oceania} />
                        <ContinentsTitle>大洋洲</ContinentsTitle>
                    </Continent>
                ) : (
                    <Continent to="/location/oceania">
                        <ContinentIcon src={oceania} />
                        <ContinentsTitle>大洋洲</ContinentsTitle>
                    </Continent>
                )}
                {active === 'south-america' ? (
                    <Continent className="active" to="/location/south-america">
                        <ContinentIcon src={south} />
                        <ContinentsTitle>南美洲</ContinentsTitle>
                    </Continent>
                ) : (
                    <Continent to="/location/south-america">
                        <ContinentIcon src={south} />
                        <ContinentsTitle>南美洲</ContinentsTitle>
                    </Continent>
                )}
                {active === 'africa' ? (
                    <Continent className="active" to="/location/africa">
                        <ContinentIcon src={africa} />
                        <ContinentsTitle>非洲</ContinentsTitle>
                    </Continent>
                ) : (
                    <Continent to="/location/africa">
                        <ContinentIcon src={africa} />
                        <ContinentsTitle>非洲</ContinentsTitle>
                    </Continent>
                )}
                {active === 'antarctica' ? (
                    <Continent className="active" to="/location/antarctica">
                        <ContinentIcon src={antarctica} />
                        <ContinentsTitle>南極洲</ContinentsTitle>
                    </Continent>
                ) : (
                    <Continent to="/location/antarctica">
                        <ContinentIcon src={antarctica} />
                        <ContinentsTitle>南極洲</ContinentsTitle>
                    </Continent>
                )}
            </ContinentList>
        </Wrapper>
    );
};

export default Sidebar;
