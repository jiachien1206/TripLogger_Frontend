import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import mapImg from '../images/map.png';

const Wrapper = styled.div`
    float: left;
    margin: 50px 50px 20px 30px;
`;
const MapLink = styled(Link)``;
const Map = styled.img`
    width: 150px;
    margin: 0px auto;
`;

const Sidebar = () => {
    return (
        <Wrapper>
            <MapLink to="/map">
                <Map src={mapImg} />
            </MapLink>
        </Wrapper>
    );
};

export default Sidebar;
