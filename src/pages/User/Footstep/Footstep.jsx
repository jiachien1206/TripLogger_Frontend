import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api.js';
import MapBlock from './Map';
import Posts from './Posts';

const Footstep = () => {
    return (
        <>
            <MapBlock />
            <Posts />
        </>
    );
};

export default Footstep;
