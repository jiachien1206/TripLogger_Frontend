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
    width: 20%;
    position: fixed;
    top: 80px;
    left: 3%;
    display: flex;
    flex-direction: column;
    margin: 20px 0px 20px 0px;
    gap: 30px;
    &.home {
        top: 120px;
    }
    &.continent {
        position: static;
    }
`;
const MapLink = styled(Link)``;
const Map = styled.img`
    width: 100%;
    margin: 0px auto;
    /* border: 1px solid rgba(255, 255, 255, 0.1); */
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const ContinentList = styled.div`
    display: flex;
    /* flex-direction: column; */
    background-color: #ffffff;
    border-radius: 15px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    flex-wrap: wrap;
    /* justify-content: center; */
    gap: 5px;
`;
// const Continent = styled(Link)`
//     text-decoration: none;
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     border-radius: 5px;
//     cursor: pointer;
//     padding: 9px 0px 9px 12px;
//     font-weight: 500;
//     font-size: 20px;
//     color: var(--secondary-font);
//     transition: all 0.1s;
//     width: 70%;
//     &:hover {
//         background-color: var(--light-orange);
//         color: var(--white);
//     }
//     &.active {
//         background-color: var(--secondary-color);
//         color: var(--white);
//     }
// `;

const Continent = styled(Link)`
    text-decoration: none;
    color: var(--secondary-font);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 5px 15px;
    border-radius: 15px;
    &:hover {
        background-color: var(--background);
    }
    &.active {
        background-color: var(--secondary-color);
        color: var(--white);
    }
`;
const ContinentIcon = styled.img`
    height: 55px;
`;
const ContinentsTitle = styled.div`
    /* font-size: 19px; */
    /* color: #65676b; */
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
