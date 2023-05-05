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
    left: 10%;
    display: flex;
    flex-direction: column;
    margin: 20px 0px 20px 0px;
    gap: 20px;
    max-width: 20vw;
    z-index: 100;
    /* flex-wrap: wrap; */
    &.home {
        top: 120px;
    }
    &.continent {
        position: static;
        margin-left: 10%;
    }
`;
const MapLink = styled(Link)``;

const MapText = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    opacity: 0;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    z-index: 110;
    transition: all 0.3s;
    font-size: 22px;
    font-weight: 600;
    &::before {
        content: '';
        border-radius: 15px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(116, 116, 116, 0.2);
        z-index: -1;
    }
`;

const Map = styled.div`
    width: 100%;
    margin: 0px auto;
    height: 20vh;
    aspect-ratio: 20/9;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    position: relative;

    &:hover {
        ${MapText} {
            opacity: 1;
        }
    }
`;

const ContinentList = styled.div`
    width: 100%;
    background-color: #ffffff;
    border-radius: 15px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    gap: 3px;
    display: grid;
    grid-template-columns: 33% 33% 33%;
`;

const Continent = styled(Link)`
    text-decoration: none;
    color: var(--secondary-font);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 8px 15px;
    border-radius: 15px;
    transition: all 0.2s;
    &:hover {
        background-color: var(--background);
    }
    &.active {
        background-color: var(--secondary-color);
        color: var(--white);
    }
`;
const ContinentIcon = styled.img`
    width: 8vh;
`;
const ContinentsTitle = styled.div``;

const Sidebar = ({ active, className }) => {
    return (
        <Wrapper className={className}>
            <MapLink to="/map">
                <Map
                    style={{
                        backgroundImage: `url(${mapImg})`,
                    }}
                >
                    <MapText>地圖找靈感</MapText>
                </Map>
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
