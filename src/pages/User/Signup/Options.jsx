import React from 'react';
import styled from 'styled-components';
import bar from '../../../images/bar.svg';

const OptionsWrap = styled.div`
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

const Options = ({ options, setOrder }) => {
    const [dragItemIndex, setDragItemIndex] = React.useState();
    const [dragOverItemIndex, setDragOverItemIndex] = React.useState();

    // Dragging
    const handleDragStart = (index) => {
        setDragItemIndex(index);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const handleDrop = (index) => {
        setDragItemIndex(undefined);
        setDragOverItemIndex(undefined);
        let _options = [...options];
        const dragItem = _options.splice(dragItemIndex, 1)[0];
        _options.splice(index, 0, dragItem);
        setOrder(_options);
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
        <OptionsWrap>
            {options.map((option, index) => {
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
                        {index + 1} {option}
                    </Option>
                );
            })}
        </OptionsWrap>
    );
};
export default Options;
