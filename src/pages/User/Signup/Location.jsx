import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api.js';

import { Title } from './Components';
import Options from './Options';

const NextPage = styled.button``;
const Location = ({ locations, setLocations, paging }) => {
    const nextPage = () => {
        paging(3);
    };

    return (
        <>
            <Title>喜歡的旅遊地點</Title>
            <Options options={locations} setOrder={setLocations}></Options>
            <NextPage onClick={nextPage}>Next</NextPage>
        </>
    );
};

export default Location;
