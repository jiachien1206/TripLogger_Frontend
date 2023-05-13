import styled from 'styled-components';
import React from 'react';

export const Title = styled.div`
    margin: 15px auto 0px;
`;

const OptionsWrap = styled.div`
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    width: 350px;
    background-color: #ffffff;
`;

const Option = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px auto;
    padding: 8px 20px;
    width: 220px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 16px;
    cursor: grabbing;
    &.next-position {
        border: none;
        opacity: 0.2;
        border-radius: 8px;
    }
    &.drag-position {
    }
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
                        className={
                            dragOverItemIndex === index
                                ? 'next-position'
                                : dragItemIndex === index
                                ? 'drag-position'
                                : ''
                        }
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
                        {option}
                    </Option>
                );
            })}
        </OptionsWrap>
    );
};
export default Options;
