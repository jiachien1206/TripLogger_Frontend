import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api.js';
import bar from '../../../images/bar.svg';

const Title = styled.div``;
const OptionWrap = styled.div`
    border: 1px solid grey;
    margin: 20px auto;
    display-flex;
    flex-direction: column;
    width: 350px;
`;
const Option = styled.div`
    display: flex;
    align-items: center;
    margin: 10px auto;
    padding: 10px 10px;
    background-color: #ffffff;
    width: 300px;
    gap: 5px;
    border-bottom: 1px solid grey;
    &.next-position {
        border: none;
        opacity: 0.2;
    }
`;
const Bar = styled.div`
    width: 13px;
    height: 16px;
    background-image: url(${bar});
    background-repeat: no-reapeat;
`;
const NextPage = styled.button``;
const Location = ({ paging }) => {
    const [page, setPage] = React.useState(1);
    const [continents, setContinents] = React.useState([
        '亞洲',
        '歐洲',
        '北美洲',
        '大洋洲',
        '南美洲',
        '非洲',
        '南極洲',
    ]);
    const [dragItemIndex, setDragItemIndex] = React.useState();
    const [dragOverItemIndex, setDragOverItemIndex] = React.useState();

    const nextPage = () => {
        paging(3);
    };

    const handleDragStart = (index) => {
        setDragItemIndex(index);
        console.log(dragItemIndex);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const handleDrop = (index) => {
        setDragItemIndex(undefined);
        setDragOverItemIndex(undefined);
        let _continents = [...continents];
        const dragItem = _continents.splice(dragItemIndex, 1);
        _continents.splice(index, 0, dragItem);
        setContinents(_continents);
    };

    const handleDragEnter = (index) => {
        setDragOverItemIndex(index);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOverItemIndex(undefined);
    };

    const handleDragEnd = (e) => {
        setDragItemIndex(undefined);
        setDragOverItemIndex(undefined);
    };
    return (
        <>
            <Title>喜歡的旅遊地點</Title>
            <OptionWrap>
                {continents.map((continent, index) => {
                    return (
                        <Option
                            className={dragOverItemIndex === index ? 'next-position' : ''}
                            key={index}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={handleDragOver}
                            onDrop={() => {
                                handleDrop(index);
                            }}
                            onDragEnter={() => {
                                handleDragEnter(index);
                            }}
                            onDragLeave={handleDragLeave}
                            onDragEnd={handleDragEnd}
                        >
                            <Bar />
                            {index + 1} {continent}
                        </Option>
                    );
                })}
            </OptionWrap>

            <NextPage onClick={nextPage}>Next</NextPage>
        </>
    );
};

export default Location;
