import React from 'react';
import Options from './Components';

const Type = ({ types, setTypes }) => {
    return (
        <>
            <Options options={types} setOrder={setTypes}></Options>
        </>
    );
};

export default Type;
