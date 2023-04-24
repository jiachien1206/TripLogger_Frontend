import React from 'react';
import styled from 'styled-components';
import Options from './Components';

const Location = ({ locations, setLocations }) => {
    return (
        <>
            <Options options={locations} setOrder={setLocations}></Options>
        </>
    );
};

export default Location;
