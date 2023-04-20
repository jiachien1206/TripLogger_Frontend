import React from 'react';
import styled from 'styled-components';
import { Title } from './Components.jsx';
import Options from '../../components/PreferenceOptions.jsx';

const Submit = styled.button``;

const Type = ({ types, setTypes, submit }) => {
    return (
        <>
            <Title>喜歡的文章類別</Title>
            <Options options={types} setOrder={setTypes}></Options>
            <Submit onClick={submit}>送出</Submit>
        </>
    );
};

export default Type;
